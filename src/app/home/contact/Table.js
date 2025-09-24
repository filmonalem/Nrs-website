'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Table,
  Button,
  Modal,
  message,
  Spin,
  Card,
  Typography,
  Popconfirm,
  Space,
  Select,
} from 'antd';
import {
  getAllContactsReducer,
  deleteContactReducer,
  updateContactReducer,
  isLoading,
  contacts,
  total,
  hasMessage,
  hasError,
} from '../../store/redux/contact';

const { Title, Text } = Typography;

const ContactStatus = {
  PENDING: 'pending',
  CONTACTED: 'contacted',
  IN_PROGRESS: 'in_progress',
  CLOSED: 'closed',
};

const ContactTable = () => {
  const dispatch = useDispatch();
  const contactList = useSelector(contacts) || [];
  const totalContacts = useSelector(total) || 0;
  const contactLoading = useSelector(isLoading);
  const contactSuccessMessage = useSelector(hasMessage);
  const contactErrorMessage = useSelector(hasError);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  useEffect(() => {
    dispatch(getAllContactsReducer({ page, limit }));
  }, [dispatch, page]);

  useEffect(() => {
    if (contactSuccessMessage) {
      message.success(contactSuccessMessage, 3);
    }
    if (contactErrorMessage) {
      message.error(contactErrorMessage, 3);
    }
  }, [contactSuccessMessage, contactErrorMessage]);

  const handleDelete = async (contactId) => {
    try {
      await dispatch(deleteContactReducer(contactId)).unwrap();
    } catch (error) {
      message.error(error || 'Failed to delete contact', 3);
    }
  };

  const handleStatusModalOpen = (contact) => {
    setSelectedContactId(contact.contactId);
    setSelectedStatus(contact.status);
    setIsStatusModalVisible(true);
  };

  const handleStatusModalClose = () => {
    setIsStatusModalVisible(false);
    setSelectedContactId(null);
    setSelectedStatus(null);
  };

  const handleStatusUpdate = async () => {
    if (!selectedContactId || !selectedStatus) {
      message.error('Please select a contact and status', 3);
      return;
    }
    try {
      await dispatch(
        updateContactReducer({
          contactId: selectedContactId,
          updateData: { status: selectedStatus },
        })
      ).unwrap();
      setIsStatusModalVisible(false);
      setSelectedContactId(null);
      setSelectedStatus(null);
    } catch (error) {
      message.error(error || 'Failed to update status', 3);
    }
  };

  const columns = [
    {
      title: 'Name',
      width: 150,
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 200,
      key: 'email',
      render: (email) => (
        <a href={`mailto:${email}`} className="text-blue-600 hover:underline">
          {email}
        </a>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: 120,
      render: (phone) => (
        <a href={`tel:${phone}`} className="text-blue-600 hover:underline">
          {phone}
        </a>
      ),
    },
    {
      title: 'Message',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      width: 200,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 200,
      render: (status) => (
        <span
          className={`capitalize ${
            status === ContactStatus.PENDING
              ? 'text-yellow-600'
              : status === ContactStatus.CONTACTED
              ? 'text-blue-600'
              : status === ContactStatus.IN_PROGRESS
              ? 'text-orange-600'
              : 'text-green-600'
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: 'Actions',
      width: 150,
      render: (_, item) => (
        <Space>
          <Button
            type="text"
            icon={<AiOutlineEdit className="text-green-600 text-lg" />}
            onClick={() => handleStatusModalOpen(item)}
            aria-label="Update contact status"
          />
          <Popconfirm
            title="Are you sure you want to delete this contact?"
            onConfirm={() => handleDelete(item.contactId)}
            okText="Yes"
            cancelText="No"
            placement="topRight"
          >
            <Button
              type="text"
              icon={<AiOutlineDelete className="text-red-600 text-lg" />}
              aria-label="Delete contact"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card>
        <Table
          className="mx-1"
          sticky
          columns={columns}
          dataSource={contactList}
          size="small"
          rowKey="contactId"
          loading={{
            spinning: contactLoading,
            indicator: <Spin size="large" />,
          }}
          pagination={{
            current: page,
            pageSize: limit,
            total: totalContacts,
            onChange: (newPage) => setPage(newPage),
            showSizeChanger: false,
            showQuickJumper: true,
            responsive: true,
          }}
          scroll={{ x: 'max-content' }}
          rowClassName="hover:bg-gray-50 transition-colors"
        />
      </Card>

      {/* Status Modal */}
      <Modal
        title={<Title level={4}>Update Contact Status</Title>}
        open={isStatusModalVisible}
        onOk={handleStatusUpdate}
        onCancel={handleStatusModalClose}
        okText="Update"
        cancelText="Cancel"
        centered
      >
        <div className="space-y-4">
          <Text>Select a new status:</Text>
          <Select
            value={selectedStatus}
            onChange={(value) => setSelectedStatus(value)}
            className="w-full"
            placeholder="Select status"
          >
            {Object.values(ContactStatus).map((status) => (
              <Select.Option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Modal>
    </>
  );
};

export default ContactTable;
