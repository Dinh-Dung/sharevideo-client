import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Home.module.scss';

import { getVideoList } from '~/utils/upload-api';
import VideoPlayer from '~/components/Video';

const cx = classNames.bind(styles);
const Home = () => {
    const [videoList, setVideoList] = useState([]);

    useEffect(() => {
        (async () => {
            const List = await getVideoList();
            setVideoList(List);
        })();
    }, []);
    return (
        <div className={cx('wrapper')}>
            {videoList.map((video, id) => (
                <VideoPlayer video={video} key={`video_${id}`} />
            ))}
        </div>
    );
};

export default Home;
