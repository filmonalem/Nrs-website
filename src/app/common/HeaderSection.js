"use client";

import { Input, Button, Space, Typography } from "antd";
import { UploadOutlined, PrinterOutlined, SearchOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function HeaderSection({ props, onImport, onPrint, filterItem }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      {/* Left section: title + description */}
      <div>
        {!props.isTitle && (
          <>
            <Title level={3} className="!mb-1">
              {props.title}
            </Title>
            <Text type="secondary">{props.description}</Text>
          </>
        )}
      </div>

      {/* Right section: actions + search */}
      <Space size="middle" wrap>
        {/* Import Button */}
        {onImport && (
          <Button
            type="primary"
            icon={<UploadOutlined />}
            onClick={onImport}
            className="rounded-md"
          >
            Import
          </Button>
        )}

        {/* Print Button */}
        {onPrint && (
          <Button
            icon={<PrinterOutlined />}
            onClick={onPrint}
            className="rounded-md"
          >
            Print
          </Button>
        )}

        {/* Search Input */}
        {props.isDisplay && (
          <Input
            placeholder={props.placeholder || "Search..."}
            prefix={<SearchOutlined />}
            type={props.type || "text"}
            value={props.value}
            onChange={filterItem}
            allowClear
            className="w-64"
          />
        )}
      </Space>
    </div>
  );
}
