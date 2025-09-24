"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { message, Button, Pagination, Select, Spin, Modal, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllNewsReducer, selectNewsItems, selectIsLoading, selectIsError, selectHasMessage, selectPagination } from "../store/redux/news";
import Footer from "@/components/Footer";
import { 
  CalendarOutlined, 
  EyeOutlined, 
  ShareAltOutlined, 
  BookOutlined,
  RocketOutlined,
  GlobalOutlined
} from '@ant-design/icons';

const { Option } = Select;

const NewsCardErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  React.useEffect(() => {
    setHasError(false);
  }, [children]);

  if (hasError) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 text-center">
        <p className="text-red-500">Error rendering this news item.</p>
      </div>
    );
  }

  try {
    return children;
  } catch {
    setHasError(true);
    return null;
  }
};

const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
    <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300" />
    <div className="p-6 space-y-4">
      <div className="h-4 bg-gray-200 rounded w-1/4" />
      <div className="h-6 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  </div>
);

const SkeletonFeatured = () => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse md:flex">
    <div className="md:w-1/2 h-96 bg-gradient-to-r from-gray-200 to-gray-300" />
    <div className="md:w-1/2 p-8 space-y-4">
      <div className="h-4 bg-gray-200 rounded w-1/4" />
      <div className="h-8 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  </div>
);

const News = () => {
  const dispatch = useDispatch();
  const newsItems = useSelector(selectNewsItems);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const hasMessage = useSelector(selectHasMessage);
  const pagination = useSelector(selectPagination);
  const [messageApi, contextHolder] = message.useMessage();
  const [category, setCategory] = useState("all");
  const [language, setLanguage] = useState("ti");
  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [viewCounts, setViewCounts] = useState({});
  const BASEURL = "http://localhost:3004/api/v1";

  const validImage = (url) => {
    return url && url !== "/uploads/photos/undefined" && !url.includes("undefined");
  };

  const mapCategory = (apiCategory) => {
    const categoryMap = {
      GENERAL: "General",
      MARKET_TRENDS: "Market Trends",
      PROPERTY_SHOWCASES: "Property Showcases",
      EVENTS: "Events",
      ACHIEVEMENTS: "Achievements",
      ANNOUNCEMENTS: "Announcements"
    };
    return categoryMap[apiCategory] || apiCategory;
  };

  const getCategoryColor = (category) => {
    const colorMap = {
      "General": "blue",
      "Market Trends": "green",
      "Property Showcases": "purple",
      "Events": "orange",
      "Achievements": "gold",
      "Announcements": "red"
    };
    return colorMap[category] || "blue";
  };

  const isRecent = (createdAt) => {
    const postDate = new Date(createdAt);
    const now = new Date();
    const diffDays = (now - postDate) / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  };

  const getDescription = (item, stripHtml = true) => {
    const desc = {
      en: item.descriptionEn,
      am: item.descriptionAm,
      ti: item.descriptionTi,
    }[language] || item.descriptionEn;
    
    if (!stripHtml) return desc || "";
    
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = desc || "";
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const showNewsDetail = (newsItem) => {
    setSelectedNews(newsItem);
    setIsModalVisible(true);
    // Increment view count
    setViewCounts(prev => ({
      ...prev,
      [newsItem.id]: (prev[newsItem.id] || 0) + 1
    }));
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedNews(null);
  };

  useEffect(() => {
    dispatch(getAllNewsReducer({ page: 1, limit: 6 }));
  }, [dispatch]);

  useEffect(() => {
    if (isError && hasMessage) {
      messageApi.error(hasMessage);
    }
  }, [isError, hasMessage, messageApi]);

  const inferCategory = (item) => {
    if (item.category && item.category !== "undefined") {
      return mapCategory(item.category);
    }
    
    const lower = (text) => text?.toLowerCase() || "";
    if (lower(item.title).includes("market") || lower(item.descriptionEn).includes("market")) {
      return "Market Trends";
    } else if (lower(item.title).includes("property") || lower(item.descriptionEn).includes("property")) {
      return "Property Showcases";
    } else if (lower(item.title).includes("event") || lower(item.descriptionEn).includes("event")) {
      return "Events";
    } else if (lower(item.title).includes("achieve") || lower(item.descriptionEn).includes("achieve")) {
      return "Achievements";
    } else if (lower(item.title).includes("announce") || lower(item.descriptionEn).includes("announce")) {
      return "Announcements";
    } else {
      return "General";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const posts = newsItems.map((item, index) => {
    const imageUrl = validImage(item.photoUrls?.[0])
      ? `http://localhost:3004${item.photoUrls[0]}`
      : "/images/news-placeholder.jpg";

    const post = {
      id: item.newsId,
      title: item.title || `News Post ${index + 1}`,
      description: getDescription(item),
      date: formatDate(item.createdAt || Date.now() - index * 86400000),
      image: imageUrl,
      category: inferCategory(item),
      isNew: isRecent(item.createdAt),
      rawItem: item
    };
    return post;
  });

  const categories = ["all", ...new Set(posts.map(post => post.category))];

  const filteredPosts = category === "all"
    ? posts
    : posts.filter(post => post.category.toLowerCase() === category.toLowerCase());

  const handlePageChange = (page, pageSize) => {
    dispatch(getAllNewsReducer({ page, limit: pageSize }));
  };

  const shareNews = (newsItem) => {
    if (navigator.share) {
      navigator.share({
        title: newsItem.title,
        text: newsItem.description,
        url: window.location.href,
      })
      .catch(() => {
        navigator.clipboard.writeText(window.location.href);
        messageApi.success("Link copied to clipboard!");
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      messageApi.success("Link copied to clipboard!");
    }
  };

  return (
    <div id="news" className="bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen">
      {contextHolder}

      <Modal
        title={null}
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={800}
        centered
        className="news-modal"
      >
        {selectedNews && (
          <div className="space-y-6">
            <div className="relative h-72 w-full rounded-lg overflow-hidden">
              <Image
                src={selectedNews.image}
                alt={selectedNews.title}
                layout="fill"
                objectFit="cover"
                quality={90}
              />
              <div className="absolute top-4 left-4">
                <Tag color={getCategoryColor(selectedNews.category)}>
                  {selectedNews.category}
                </Tag>
                {selectedNews.isNew && (
                  <Tag color="red" className="ml-2">
                    NEW
                  </Tag>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                {selectedNews.title}
              </h2>
              
              <div className="flex items-center text-gray-500 text-sm">
                <CalendarOutlined className="mr-1" />
                <span className="mr-4">{selectedNews.date}</span>
                <EyeOutlined className="mr-1" />
                <span>{viewCounts[selectedNews.id] || 1} views</span>
              </div>

              <div className="prose max-w-none border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded">
                <div dangerouslySetInnerHTML={{ __html: selectedNews.rawItem.descriptionEn }} />
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <Button 
                type="primary" 
                icon={<ShareAltOutlined />}
                className="bg-blue-600 hover:bg-blue-700 flex items-center"
                onClick={() => shareNews(selectedNews)}
              >
                Share
              </Button>
              <Button onClick={handleModalClose}>Close</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Hero Section */}
      <div className="relative h-80 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/news-banner.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700 opacity-90"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="text-white animate-slide-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              School News & Updates
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Stay informed about the latest happenings at Rainbows for Children School
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4 bg-white rounded-lg shadow-md -mt-10 relative z-10 mx-4">
        <div className="flex items-center">
          <BookOutlined className="text-2xl text-blue-600 mr-3" />
          <h2 className="text-xl font-semibold text-gray-800">Latest News</h2>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Select
            defaultValue="all"
            onChange={setCategory}
            className="w-full md:w-48"
            size="large"
            suffixIcon={<RocketOutlined />}
            aria-label="Filter by category"
          >
            {categories.map(cat => (
              <Option key={cat} value={cat.toLowerCase()}>
                {cat}
              </Option>
            ))}
          </Select>
          
          <Select
            defaultValue="ti"
            onChange={setLanguage}
            className="w-full md:w-48"
            size="large"
            suffixIcon={<GlobalOutlined />}
            aria-label="Select language"
          >
            <Option value="en">English</Option>
            <Option value="am">Amharic</Option>
            <Option value="ti">Tigrinya</Option>
          </Select>
        </div>
      </div>

      {/* News Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {isLoading ? (
          <div className="space-y-12">
            <SkeletonFeatured />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(3).fill().map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        ) : isError ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-md p-8">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <p className="text-red-500 text-lg mb-4">{hasMessage || "Failed to load news posts."}</p>
            <Button
              type="primary"
              onClick={() => dispatch(getAllNewsReducer({ page: 1, limit: 6 }))}
              className="bg-blue-600 hover:bg-blue-700"
              size="large"
            >
              Try Again
            </Button>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-md p-8">
            <div className="text-gray-400 text-5xl mb-4">📰</div>
            <p className="text-gray-600 text-lg mb-2">No news posts available for this category.</p>
            <p className="text-gray-500">Check back later for updates!</p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured Post */}
            {filteredPosts[0] && (
              <NewsCardErrorBoundary>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-slide-up hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="md:flex">
                    <div className="md:w-1/2 relative h-96">
                      <Image
                        src={filteredPosts[0].image}
                        alt={filteredPosts[0].title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                        quality={90}
                        priority
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <Tag color={getCategoryColor(filteredPosts[0].category)}>
                          {filteredPosts[0].category}
                        </Tag>
                        {filteredPosts[0].isNew && (
                          <Tag color="red">NEW</Tag>
                        )}
                      </div>
                    </div>
                    <div className="md:w-1/2 p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center text-gray-500 text-sm mb-3">
                          <CalendarOutlined className="mr-1" />
                          <span>{filteredPosts[0].date}</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
                          {filteredPosts[0].title}
                        </h2>
                        <p className="text-gray-600 mb-6 line-clamp-4 leading-relaxed">
                          {getDescription(filteredPosts[0].rawItem)}
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <Button
                          onClick={() => showNewsDetail(filteredPosts[0])}
                          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center"
                          size="large"
                        >
                          Read Full Story
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </NewsCardErrorBoundary>
            )}

            {/* Grid Posts */}
            {filteredPosts.length > 1 && (
              <>
                <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                  <span className="bg-blue-100 p-2 rounded-lg mr-3">
                    <BookOutlined className="text-blue-600" />
                  </span>
                  More News
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.slice(1).map((post) => (
                    <NewsCardErrorBoundary key={post.id}>
                      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            quality={85}
                          />
                          <div className="absolute top-3 left-3 flex gap-2">
                            <Tag color={getCategoryColor(post.category)} className="text-xs">
                              {post.category}
                            </Tag>
                            {post.isNew && (
                              <Tag color="red" className="text-xs">NEW</Tag>
                            )}
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center text-gray-500 text-xs mb-3">
                            <CalendarOutlined className="mr-1" />
                            <span>{post.date}</span>
                          </div>
                          <h2 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {post.title}
                          </h2>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                            {getDescription(post.rawItem)}
                          </p>
                          <div className="flex justify-between items-center">
                            <Button
                              onClick={() => showNewsDetail(post)}
                              type="link"
                              className="p-0 text-blue-600 hover:text-blue-800 font-medium flex items-center"
                            >
                              Read More
                              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                              </svg>
                            </Button>
                            <Button
                              icon={<ShareAltOutlined />}
                              size="small"
                              type="text"
                              onClick={(e) => {
                                e.stopPropagation();
                                shareNews(post);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </NewsCardErrorBoundary>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Pagination */}
        {pagination?.totalPages > 0 && (
          <div className="mt-12 flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 mb-4">
              Showing {filteredPosts.length} of {pagination.total} news items
            </p>
            <Pagination
              current={pagination.currentPage}
              total={pagination.total}
              pageSize={6}
              onChange={handlePageChange}
              showSizeChanger
              pageSizeOptions={[6, 12, 24]}
              onShowSizeChange={(current, size) => dispatch(getAllNewsReducer({ page: 1, limit: size }))}
              className="antd-pagination"
            />
          </div>
        )}
      </div>

    </div>
  );
};

export default News;