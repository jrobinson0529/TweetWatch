import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Label } from 'semantic-ui-react';
import Feed from '../components/Feed';
import PageHeader from '../components/PageHeader';
import getSingleTopic from '../helpers/data/topicData';
import { getCategoryTweeterInfo, getUserTweetsFiltered } from '../helpers/data/tweeterData';

function Topic() {
  const { id } = useParams();
  const [topic, setTopic] = useState({
    searchParams: []
  });
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    getSingleTopic(id).then((response) => {
      setTopic(response);
      getCategoryTweeterInfo(response.categoryId).then((x) => {
        getUserTweetsFiltered(x.map((tweeterInfo) => tweeterInfo.username), response.searchParams).then(setTweets);
      });
    });
  }, [id]);
  return (
    <>
      <PageHeader headTitle={topic.title} description={topic.description}/>
      <Label.Group className='topic-label-container' color='teal' size='large'>
        {topic.searchParams.map((string, i) => <Label key={i} content={string}/>)}
      </Label.Group>
      <Feed tweets={tweets}/>
    </>
  );
}
Topic.propTypes = {
  tweets: PropTypes.array,
  setTweets: PropTypes.func,
};
export default Topic;
