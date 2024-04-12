import { Table } from 'antd';

interface Interface {
    className?: string;
    columns: any[];
    dataSource: any[];
}

const InformsTable: React.FC<Interface> = ({
    className,
    dataSource,
    columns,
}) => {
    return (
        <Table
            className={className}
            dataSource={dataSource}
            columns={columns}
        />
    );
};

export default InformsTable;
