import React from 'react';
import Pagination from 'antd/lib/pagination';
import './SplitViewPagination.scss';

const SplitViewPagination = (props) => {

	const {
		total,
		current,
		pageSize,
		pageSizeOptions,
		paginationOnChangeCallback
	} = props;

	return <Pagination
		className="split-view-pagination"
		size="small"
		current={current}
		total={total}
		pageSize={pageSize}
		showSizeChanger
		pageSizeOptions={pageSizeOptions}
		onChange={(page, pageSize) => paginationOnChangeCallback(page, pageSize)}
		onShowSizeChange={(page, pageSize) => paginationOnChangeCallback(page, pageSize)}
	/>;

};

export default SplitViewPagination;