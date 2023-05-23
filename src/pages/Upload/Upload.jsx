/* eslint-disable no-const-assign */
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Upload.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button/Button';
import { uploadVideoToCloud } from '~/utils/upload-api';
import { getCategoryList } from '~/utils/category-api';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
const Upload = () => {
    const inputRef = useRef(null);
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploadForm, setUploadForm] = useState({
        description: '',
        user_request_status: 'public',
        category_id: 1,
    });

    const [categoryList, setCategoryList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const list = await getCategoryList();
            setCategoryList(list);
        })();
    }, []);

    const onUploadFile = (e) => {
        const file = e.target.files[0];
        setVideo(file);
    };

    const onFinish = async () => {
        setLoading(true);
        let formData = new FormData();

        formData.append('file', video);
        formData.append('description', uploadForm.description);
        formData.append('user_request_status', uploadForm.user_request_status);
        formData.append('category_id', uploadForm.category_id);

        const data = await uploadVideoToCloud(formData);
        if (data) {
            navigate('/');
        } else {
            alert('Upload failed! Please try again');
        }
        setLoading(false);
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('layout')}>
                    <div className={cx('container-layout')}>
                        <div className={cx('post-title')}>
                            <span className={cx('title')}>Upload video</span>
                            <div className={cx('sub')}>
                                <span className={cx('sub-title')}>Post a video to your account</span>
                            </div>
                        </div>
                        <div className={cx('content')}>
                            <label htmlFor="upload">
                                {video ? (
                                    <video controls width={300}>
                                        <source src={URL.createObjectURL(video)} type="video/mp4" />
                                    </video>
                                ) : (
                                    <div className={cx('uploader')}>
                                        <div className={cx('upload')}>
                                            <input
                                                type="file"
                                                id="upload"
                                                onChange={onUploadFile}
                                                style={{ display: 'none' }}
                                                ref={inputRef}
                                            />
                                            <div className={cx('upload-card')}>
                                                <FontAwesomeIcon
                                                    icon={faCloudArrowUp}
                                                    style={{ color: '#939ba9', width: '40px', height: '29px' }}
                                                />
                                                <div className={cx('text-main')}>
                                                    <span className={cx('text-main-span')}>Select video to upload</span>
                                                </div>
                                                <div className={cx('text-sub')}>
                                                    <span className={cx('text-sub-span')}>Or drag and drop file</span>
                                                </div>
                                                <div className={cx('text-video-info')}>
                                                    <div className={cx('tfi1')}>
                                                        <span>MP4</span>
                                                    </div>
                                                    <div className={cx('tfi2')}>
                                                        <span>720x1280 resolution or higher</span>
                                                    </div>
                                                    <div className={cx('tfi3')}>
                                                        <span>Up to 10 minutes</span>
                                                    </div>
                                                    <div className={cx('tfi4')}>
                                                        <span></span>
                                                    </div>
                                                    Less than 30 MB
                                                </div>
                                                <div className={cx('file-select-button')}>
                                                    <Button primary>Select file</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </label>
                            <div className={cx('form')}>
                                <div className={cx('caption-wrapper')}>
                                    <div className={cx('caption')}>
                                        <div className={cx('caption-title')}>
                                            <span>Caption</span>
                                            <span className={cx('require-font')}>
                                                <span className={cx('first')}>{uploadForm.description.length}</span>/
                                                2200
                                            </span>
                                        </div>
                                    </div>
                                    <div className={cx('input-write-content')}>
                                        <input
                                            type="text"
                                            value={uploadForm.description}
                                            onChange={(e) =>
                                                setUploadForm((prev) => ({ ...prev, description: e.target.value }))
                                            }
                                        />
                                    </div>
                                </div>

                                <div className={cx('chose-wrapper')}>
                                    <div className={cx('chose-title')}>
                                        <span>Who can watch this video</span>
                                    </div>
                                    <div className={cx('select')} style={{ width: '300px', height: '36px' }}>
                                        <select
                                            value={uploadForm.user_request_status}
                                            onChange={(e) =>
                                                setUploadForm((prev) => ({
                                                    ...prev,
                                                    user_request_status: e.target.value,
                                                }))
                                            }
                                        >
                                            <option className={cx('option')} value="public">
                                                Public
                                            </option>
                                            <option className={cx('option')} value="private">
                                                Private
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div className={cx('chose-wrapper')}>
                                    <div className={cx('chose-title')}>
                                        <span>Your category</span>
                                    </div>
                                    <div className={cx('select')} style={{ width: '300px', height: '36px' }}>
                                        <select
                                            value={uploadForm.category_id}
                                            onChange={(e) =>
                                                setUploadForm((prev) => ({
                                                    ...prev,
                                                    category_id: Number(e.target.value),
                                                }))
                                            }
                                        >
                                            {categoryList.map((category, id) => (
                                                <option key={id} className={cx('option')} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {loading ? (
                                    <>
                                        <div className={cx('loader')}></div>
                                        <span className={cx('message-upload')}>
                                            Video của bạn đã được đăng lên và đang đợi kiểm duyệt! Vui lòng chờ{' '}
                                        </span>
                                    </>
                                ) : (
                                    <div className={cx('button')}>
                                        <div className={cx('btn-cancel')} onClick={() => navigate('/')}>
                                            <Button secondary>Discard</Button>
                                        </div>
                                        <div className={cx('btn-post')} onClick={() => onFinish()}>
                                            <Button success>Post</Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Upload;
