import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container, Segment, Accordion, Icon, List
} from 'semantic-ui-react';
import PageHeader from '../components/PageHeader';

function Home() {
  class HomeAccordion extends Component {
    state = { activeIndex: 0 };

    handleClick = (e, titleProps) => {
      const { index } = titleProps;
      const { activeIndex } = this.state;
      const newIndex = activeIndex === index ? -1 : index;

      this.setState({ activeIndex: newIndex });
    };

    render() {
      const { activeIndex } = this.state;

      return (
        <Accordion className="home-page-accordion">
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={this.handleClick}
            className="accordion-title"
          >
            <Icon name="dropdown" />
            Purpose
          </Accordion.Title>
          <Accordion.Content
            active={activeIndex === 0}
            className="accordion-content"
          >
            <p>
              I created this app in order to filter the clutter of Twitter and
              gather information that I want from certain twitter accounts more
              quickly and efficiently. These days Twitter is at the forefront of
              announcements for game devs, movie producers and all sorts of news
              outlets. Find what you want and avoid the mess with TweetWatch.
            </p>
            <p>
              *Some parts of the App may load slowly due to API calls to twitter
              being run through a Proxy server. This is due to Twitter not
              supporting CORS*
            </p>
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={this.handleClick}
            className="accordion-title"
          >
            <Icon name="dropdown" />
            Getting Started
          </Accordion.Title>
          <Accordion.Content
            active={activeIndex === 1}
            className="accordion-content"
          >
            <List as="ol">
              <List.Item as="li">
                Create Category
                <List.List as="ol">
                  <List.Item as="li">
                    Click the blue &apos;plus&apos; next to the Categories
                    header in the side navbar.
                  </List.Item>
                  <List.Item as="li">
                    Fill out the form and submit. You will then be at the
                    category page.
                  </List.Item>
                  <List.Item as="li">
                    Add Twitter handles that you would like to view tweets from!
                  </List.Item>
                </List.List>
              </List.Item>
              <List.Item as="li">
                Create Topic(s)
                <List.List as="ol">
                  <List.Item as="li">
                    Click the blue &apos;plus&apos; next to the Topics header in
                    the side navbar.
                  </List.Item>
                  <List.Item as="li">
                    Fill out the form, and make sure to select a category to add
                    the topic to. The search paramaters are the keywords that
                    will filter the tweets you recieve. The tweets are from the
                    twitter handles you set for that parent category!
                  </List.Item>
                  <List.Item as="li">
                    Enjoy and explore some of the sites other features! Tweets
                    are from the last seven days only!
                  </List.Item>
                </List.List>
              </List.Item>
            </List>
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 2}
            index={2}
            onClick={this.handleClick}
            className="accordion-title"
          >
            <Icon name="dropdown" />
            Use Cases
          </Accordion.Title>
          <Accordion.Content
            active={activeIndex === 2}
            className="accordion-content"
          >
            <p>
              You can get pretty creative with how to use the site. For Example
              my SO, Amy loves to look at cute dogs (who doesn&apos;t?) on a
              Twitter handle called @dog_rates and as the name suggests they
              rate dogs up to 14/10. You can set up a topic to view only dogs
              that were given the highest ranks 14/10 and 13/10 to see only the
              very BEST pups.
            </p>
            <p>
              For myself I am a gamer and I like to follow certain game devs to
              see when they announce content release or patches for the games I
              play. I could simply create a category for Games. Create a topic
              for a game that I play and set the search to look for keywords:
              Content, Patch, Release, or anything specific I may want to see!
            </p>
            <p>
              The things you can sift through are endless this is especially
              helpful when certain accounts post a lot. Thanks for reading and
              visiting!
            </p>
          </Accordion.Content>
        </Accordion>
      );
    }
  }
  return (
    <div>
      <PageHeader headTitle="TweetWatch" />
      <Container fluid className="home-page-about-container">
        <Segment className="home-page-about-content" textAlign="left">
          <HomeAccordion />
        </Segment>
      </Container>
    </div>
  );
}
Home.propTypes = {
  time: PropTypes.string,
};

export default Home;
