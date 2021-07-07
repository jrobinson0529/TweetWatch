import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import {
  Button,
  Form,
  Icon,
  Label,
  Divider,
  Transition,
  Loader,
  Dimmer,
} from 'semantic-ui-react';
import Feed from '../components/Feed';
import PageHeader from '../components/PageHeader';
import StyledHeader from '../components/styled_components/StyledHeader';
import { getSingleCategory } from '../helpers/data/categoryData';
import {
  createTweeter,
  deleteTweeter,
} from '../helpers/data/categoryTweeterData';
import mergeTweetData from '../helpers/mergeTweetData';

function Category() {
  const { id } = useParams();
  const [category, setCategory] = useState({});
  const [tweeters, setTweeters] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleLoader = () => setLoading((prevState) => !prevState);

  useEffect(() => {
    getSingleCategory(id).then((response) => {
      setCategory(response);
      toggleLoader();
    });
  }, [id]);

  useEffect(() => {
    toggleLoader();
    mergeTweetData(id, setTweeters, setTweets).then(() => toggleLoader());
  }, [id]);

  const TweeterCard = ({ ...tweeterInfo }) => {
    const handleClick = () => {
      toggleLoader();
      deleteTweeter(tweeterInfo.username, id).then(() => {
        mergeTweetData(id, setTweeters, setTweets);
        toggleLoader();
      });
    };
    return (
      <Label image size="big">
        <img src={tweeterInfo.profile_image_url} />
        {tweeterInfo.username}
        {tweeterInfo.verified && (
          <Icon
            color="blue"
            name="check circle"
            style={{ marginLeft: '5px' }}
          />
        )}
        <Icon name="delete" onClick={handleClick} />
      </Label>
    );
  };
  const TweeterForm = () => {
    const [visible, setVisible] = useState(false);
    const [tweeter, setTweeter] = useState({
      categoryId: id,
      twitterId: '',
    });
    const toggleForm = () => {
      setVisible((prevState) => !prevState);
    };
    const handleSubmit = () => {
      setLoading((prevState) => !prevState);
      createTweeter(id, tweeter).then(() => {
        mergeTweetData(id, setTweeters, setTweets);
        setLoading((prevState) => !prevState);
      });
    };
    const handleChange = (e) => {
      setTweeter((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value.toLowerCase(),
      }));
    };
    return (
      <>
        <Button color="twitter" onClick={toggleForm}>
          <Icon name="twitter" />
          {visible ? 'Close' : 'Add Tweeter'}
        </Button>
        <Divider hidden />
        <Transition visible={visible} animation="scale" duration={500}>
          <Form
            onSubmit={handleSubmit}
            style={{
              width: '25%',
              margin: 'auto',
            }}
          >
            <Form.Input
              label="Twitter handle"
              type="text"
              name="twitterId"
              placeholder="NashSoftware,jesserobinsons,gordonramsay,etc - No spaces!"
              onChange={handleChange}
            />
          </Form>
        </Transition>
      </>
    );
  };

  return (
    <>
      {loading ? (
        <Dimmer active inverted>
          <Loader content="Loading" />
        </Dimmer>
      ) : (
        <div>
          <PageHeader
            headTitle={category?.title}
            description={category?.description}
          />
          <TweeterForm />
          <Label.Group style={{ margin: '20px' }}>
            {tweeters.length > 0 ? (
              tweeters.map((tweeterInfo) => (
                <TweeterCard key={tweeterInfo.id} {...tweeterInfo} />
              ))
            ) : (
              <StyledHeader inputfontsize="2em">
                Add a @Twitter handle to start tracking!
              </StyledHeader>
            )}
          </Label.Group>
          <Feed tweets={tweets} />
        </div>
      )}
    </>
  );
}
Category.propTypes = {
  tweets: PropTypes.array,
  setTweets: PropTypes.func,
};

export default Category;
