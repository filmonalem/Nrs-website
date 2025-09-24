'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';
import { useDispatch, useSelector } from 'react-redux';
import { addNewsReducer, getOneNewsReducer, deleteNewsReducer } from '../../store/redux/news';
import { useRouter, useSearchParams } from 'next/navigation';
import { Form, Input, Button, Divider, message, Spin, Tooltip, Select } from 'antd';
import { motion } from 'framer-motion';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { FaWhatsapp, FaTelegramPlane, FaPhone } from 'react-icons/fa';
import 'react-quill-new/dist/quill.snow.css';
import HeaderSection from '@/app/common/HeaderSection';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
const { Option } = Select;

export default function NewsForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const newsId = searchParams.get('id');
  const { isLoading, isError, hasMessage, news } = useSelector((state) => state.news || {});
  const [form] = Form.useForm();
  const [files, setFiles] = useState([]); 
  const [previews, setPreviews] = useState([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [compressionProgress, setCompressionProgress] = useState(0);

  const quillRefEn = useRef(null);
  const quillRefAm = useRef(null);
  const quillRefTi = useRef(null);

  const quillModules = {
    toolbar: [
      [{ font: ['sans-serif', 'serif', 'monospace', 'Noto Serif Ethiopic'] }],
      [{ size: ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline'],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['clean'],
    ],
  };

  const quillFormats = [
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'color',
    'background',
    'align',
  ];

  useEffect(() => {
    if (newsId) {
      dispatch(getOneNewsReducer(newsId));
    }
  }, [newsId, dispatch]);

  useEffect(() => {
    if (news && newsId) {
      form.setFieldsValue({
        title: news.title || '',
        descriptionEn: news.descriptionEn || '',
        descriptionAm: news.descriptionAm || '',
        descriptionTi: news.descriptionTi || '',
        category: news.category || 'GENERAL', 
      });
      if (news.photoUrls && Array.isArray(news.photoUrls)) {
        setPreviews(news.photoUrls.map((url, index) => ({
          url: url.startsWith('http') ? url : `http://localhost:3004${url}`,
          type: 'image',
          mimeType: 'image/jpeg',
          name: `Existing Image ${index + 1}`,
        })));
      }
    }
  }, [news, newsId, form]);

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 800,
      useWebWorker: true,
      onProgress: (progress) => setCompressionProgress(progress),
    };
    try {
      const compressed = await imageCompression(file, options);
      return new File([compressed], file.name, { type: compressed.type });
    } catch (error) {
      throw new Error(`Failed to compress ${file.name}: ${error.message}`);
    }
  };

  const handleFileUpload = useCallback(
    async (acceptedFiles) => {
      console.log(
        'Received files:',
        acceptedFiles.map((f) => ({ name: f.name, type: f.type, size: f.size }))
      );
      const maxImageSize = 5 * 1024 * 1024; 
      const maxTotalFiles = 10;
      const allowedMimetypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

      if (files.length + acceptedFiles.length > maxTotalFiles) {
        message.error(`Maximum ${maxTotalFiles} images allowed.`);
        return;
      }

      const processedFiles = [];
      const processedPreviews = [];

      try {
        setIsCompressing(true);
        setCompressionProgress(0);
        for (const file of acceptedFiles) {
          if (!(file instanceof File)) {
            console.warn(`Skipping non-file object:`, file);
            continue;
          }

          if (!allowedMimetypes.includes(file.type)) {
            message.error(`${file.name} is not a supported image type.`);
            continue;
          }

          if (file.size > maxImageSize) {
            message.error(`${file.name} exceeds 5MB limit.`);
            continue;
          }

          if (!file.size || !file.name) {
            console.warn(`Skipping invalid file: ${file.name}`);
            continue;
          }

          let processedFile = file;
          try {
            processedFile = await compressImage(file);
          } catch (error) {
            message.error(error.message);
            continue;
          }

          processedFiles.push(processedFile);
          processedPreviews.push({
            url: URL.createObjectURL(processedFile),
            type: 'image',
            mimeType: processedFile.type,
            name: processedFile.name,
          });
        }

        setFiles((prev) => [...prev, ...processedFiles]);
        setPreviews((prev) => {
          const newPreviews = [...prev, ...processedPreviews];
          return newPreviews;
        });
      } catch (error) {
        message.error(`Failed to process images: ${error.message}`);
      } finally {
        setIsCompressing(false);
        setCompressionProgress(0);
      }
    },
    [files.length]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
    },
    onDrop: handleFileUpload,
    maxFiles: 10,
    disabled: isCompressing || files.length >= 10,
    onDropRejected: (fileRejections) => {
      fileRejections.forEach((rejection) => {
        message.error(`${rejection.file.name}: ${rejection.errors[0].message}`);
      });
    },
  });

  const handleRemoveFile = (index) => {
    URL.revokeObjectURL(previews[index].url);
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (values) => {
    try {
      await form.validateFields();
    } catch (error) {
      message.error('Please fill in all required fields.');
      return;
    }

    if (files.length === 0 && !newsId) {
      message.error('At least one image is required for new posts.');
      return;
    }

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('descriptionEn', values.descriptionEn || '');
    formData.append('descriptionTi', values.descriptionTi || '');
    formData.append('descriptionAm', values.descriptionAm || '');
    formData.append('category', values.category); 
    let fileCount = 0;
    files.forEach((file, index) => {
      if (file instanceof File && file.size > 0) {
    
        formData.append('files', file);
        fileCount++;
      } else {
        console.warn(`Skipping invalid file at index ${index}:`, file);
      }
    });

    if (fileCount === 0 && !newsId) {
      message.error('No valid files to upload.');
      return;
    }

    for (const [key, value] of formData.entries()) {
      console.log(
        `${key}:`,
        value instanceof File ? `${value.name} (${value.type}, ${value.size} bytes)` : value
      );
    }

    try {
      const result = await dispatch(addNewsReducer(formData)).unwrap();
      message.success(result.message || 'News posted successfully!');
      form.resetFields();
      setFiles([]);
      setPreviews([]);
      router.push('/news');
    } catch (error) {
      const errorMessage = error.message || error.error || 'Failed to post news.';
      message.error(errorMessage);
    }
  };

  const handleDelete = async () => {
    if (!newsId) return;
    try {
      await dispatch(deleteNewsReducer(newsId)).unwrap();
      message.success('News deleted successfully!');
    } catch (error) {
      const errorMessage = error.message || error.error || 'Failed to delete news.';
      message.error(errorMessage);
    }
  };

  const props = {
    title: newsId ? 'Edit News' : 'Add News',
    description: newsId ? 'Edit news item' : 'Create a new news post',
    name: 'News',
    isTitle: false,
    searchTerm: searchTerm,
    setSearchValue: setSearchTerm,
    placeholder: 'Search title',
    type: 'text',
    value: searchTerm,
    isDisplay: !newsId,
  };

  const searchContact = (e) => {
    setSearchTerm(e.target.value);
  };

  const printData = () => {};

  useEffect(() => {
    if (isError && hasMessage) {
      message.error(hasMessage);
    } else if (!isError && hasMessage) {
      message.success(hasMessage);
    }
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [isError, hasMessage, previews]);

  return (
    <>
      <HeaderSection props={props} onPrint={printData} filterItem={searchContact} />
      <div className="max-w-7xl mx-auto p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-gray-100 shadow-xl rounded-2xl font-poppins">
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Ethiopic&display=swap');
          .ql-container {
            font-family: 'Noto Serif Ethiopic', sans-serif;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .ql-toolbar {
            border-radius: 8px 8px 0 0;
            background: #f8fafc;
          }
          .ql-editor {
            min-height: 150px;
            background: white;
            border-radius: 0 0 8px 8px;
          }
        `}</style>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* File Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
          >
            <div
              {...getRootProps()}
              className={`border-2 border-dashed p-8 rounded-lg transition-all duration-300 ${
                isDragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
              } cursor-pointer flex flex-col items-center justify-center`}
              aria-label="Drag and drop images or click to upload"
            >
              <input {...getInputProps()} />
              <UploadOutlined className="text-3xl text-gray-500 mb-2" />
              <p className="text-gray-600 text-center text-sm sm:text-base font-medium">
                Drag & drop images here, or click to select
              </p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">
                (Max 10 images, ≤ 5MB each, JPG/PNG/GIF/WEBP)
              </p>
            </div>
            {isCompressing && (
              <div className="mt-4">
                <Spin tip={`Compressing images... ${Math.round(compressionProgress)}%`} />
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${compressionProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
            {previews.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                  Uploaded Images ({previews.length}/10)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
                  {previews.map((preview, index) => (
                    <Tooltip key={index} title={preview.name}>
                      <div className="relative group rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                        <img
                          src={preview.url}
                          alt={`Preview of ${preview.name}`}
                          className="w-full h-32 sm:h-40 object-cover"
                        />
                        <Button
                          type="link"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleRemoveFile(index)}
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-1 shadow-md"
                          size="small"
                          aria-label={`Remove ${preview.name}`}
                        />
                        <div className="text-xs text-gray-600 truncate mt-1 px-2 pb-2">
                          {preview.name}
                        </div>
                      </div>
                    </Tooltip>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              className="space-y-6"
              disabled={isLoading}
              initialValues={{ category: 'GENERAL' }}
            >
              <Form.Item
                label={<span className="text-gray-800 font-semibold text-sm sm:text-base">Title</span>}
                name="title"
                rules={[{ required: true, message: 'Please enter news title!' }]}
              >
                <Input
                  placeholder="Enter news title"
                  className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-gray-800 font-semibold text-sm sm:text-base">Category</span>}
                name="category"
                rules={[{ required: true, message: 'Please select a category!' }]}
              >
                <Select
                  placeholder="Select category"
                  className="rounded-lg"
                  size="large"
                >
                  <Option value="MARKET_TRENDS">Market Trends</Option>
                  <Option value="PROPERTY_SHOWCASES">Property Showcases</Option>
                  <Option value="GENERAL">General</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label={<span className="text-gray-800 font-semibold text-sm sm:text-base">Description (English)</span>}
                name="descriptionEn"
                rules={[{ required: true, message: 'Please enter English description!' }]}
              >
                <ReactQuill
                  ref={quillRefEn}
                  theme="snow"
                  modules={quillModules}
                  formats={quillFormats}
                  className="mt-1"
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-gray-800 font-semibold text-sm sm:text-base">Description (Tigrigna)</span>}
                name="descriptionTi"
              >
                <ReactQuill
                  ref={quillRefTi}
                  theme="snow"
                  modules={quillModules}
                  formats={quillFormats}
                  className="mt-1"
                />
              </Form.Item>
              <Form.Item
                label={<span className="text-gray-800 font-semibold text-sm sm:text-base">Description (Amharic)</span>}
                name="descriptionAm"
              >
                <ReactQuill
                  ref={quillRefAm}
                  theme="snow"
                  modules={quillModules}
                  formats={quillFormats}
                  className="mt-1"
                />
              </Form.Item>


              <Divider className="my-6 border-gray-200" />

              <div className="flex justify-end space-x-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="default"
                    onClick={() => {
                      form.resetFields();
                      previews.forEach((p) => URL.revokeObjectURL(p.url));
                      setFiles([]);
                      setPreviews([]);
                    }}
                    disabled={isLoading}
                    className="border-blue-500 text-blue-500 hover:border-blue-600 hover:text-blue-600 font-poppins rounded-lg px-6 py-2 text-sm sm:text-base"
                    size="large"
                  >
                    Cancel
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-poppins rounded-lg px-6 py-2 text-sm sm:text-base"
                    size="large"
                  >
                    {newsId ? 'Update News' : 'Post News'}
                  </Button>
                </motion.div>
                {newsId && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      type="primary"
                      danger
                      onClick={handleDelete}
                      disabled={isLoading}
                      className="bg-red-600 hover:bg-red-700 text-white font-poppins rounded-lg px-6 py-2 text-sm sm:text-base"
                      size="large"
                    >
                      Delete News
                    </Button>
                  </motion.div>
                )}
              </div>
            </Form>
          </motion.div>
        </div>

      </div>
    </>
  );
}