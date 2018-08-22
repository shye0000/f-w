import streamSaver from 'streamsaver';

const getFileNameByContentDisposition = (contentDisposition) => {
	const regex = /filename[^;=\n]*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/i;
	const matches = regex.exec(contentDisposition);

	let filename;

	if (matches != null && matches[2]) {
		filename = matches[2].replace(/['"]/g, '');
	}

	return decodeURI(filename);
};


const downloadFileFromReadableStream = (response, filename) => {
	const contentDisposition = response.headers.get('Content-Disposition');
	if (!filename && contentDisposition) {
		filename = getFileNameByContentDisposition(contentDisposition);
	}
	const fileStream = streamSaver.createWriteStream(filename || 'unknown');
	const writer = fileStream.getWriter();
	const reader = response.body.getReader();

	const pump = () => reader.read()
		.then(({ value, done }) => {
			if (done) { writer.close();}
			else { writer.write(value).then(pump); }
		});

	pump();
};

export default downloadFileFromReadableStream;