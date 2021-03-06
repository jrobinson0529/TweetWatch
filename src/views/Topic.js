import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Dimmer, Label, Loader } from 'semantic-ui-react';
import Feed from '../components/Feed';
import PageHeader from '../components/PageHeader';
import { getSingleTopic } from '../helpers/data/topicData';
import { getUserTweetsFiltered } from '../helpers/data/tweeterData';
import { getCategoryTweeterInfo } from '../helpers/data/categoryTweeterData';

function Topic() {
  const { id } = useParams();
  const [topic, setTopic] = useState({
    searchParams: []
  });
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleLoader = () => setLoading((prevState) => !prevState);

  useEffect(() => {
    toggleLoader();
    getSingleTopic(id).then((response) => {
      setTopic(response);
      getCategoryTweeterInfo(response.categoryId).then((x) => {
        getUserTweetsFiltered(x.map((tweeterInfo) => tweeterInfo.username), response.searchParams).then(setTweets);
        toggleLoader();
      });
    });
  }, [id]);
  return (
    <>
     { loading
       ? <Dimmer active inverted>
              <Loader content='Loading'/>
          </Dimmer>
       : <div>
            <PageHeader headTitle={topic.title} description={topic.description}/>
      <Label.Group className='topic-label-container' color='teal' size='large'>
        {topic.searchParams.map((string, i) => <Label key={i} content={string}/>)}
      </Label.Group>
      <Feed tweets={tweets}/>
          </div> }
    </>
  );
}
Topic.propTypes = {
  tweets: PropTypes.array,
  setTweets: PropTypes.func,
};
export default Topic;
