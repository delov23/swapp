import React from 'react';
import { mount, shallow } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import wait from 'waait';

import Episode, { EPISODE_QUERY } from '../Episode';
import { EpisodePage } from '../components/EpisodePage';
import { LeftImageCard } from '../../../components/LeftImageCard';
import { Button } from '../../../components/Button';

const mocks = [
  {
    request: {
      query: EPISODE_QUERY,
      variables: { id: 'films.1', first: 5 },
    },
    result: () => ({
      data: {
        episode: {
          id: 'films.1',
          title: 'A New Hope',
          episodeId: 4,
          openingCrawl:
            "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
          image: 'https://m.media-amazon.com/images/I/81r+LN-YReL._SS500_.jpg',
          director: 'George Lucas',
          releaseDate: '1977-05-25',
          people: {
            edges: [
              {
                node: {
                  id: 'people.1',
                  name: 'Luke Skywalker',
                  image:
                    'https://links.gunaxin.com/content/images/post_images/Luke_Skywalker_039_s_Original_039_Star_Wars_039_Lightsaber_Is_Going_Up_For_Auction_1544116268_4528.jpg',
                },
                cursor: 'Y3Vyc29yLnBlb3BsZS4x',
              },
              {
                node: {
                  id: 'people.10',
                  name: 'Obi-Wan Kenobi',
                  image:
                    'https://fsmedia.imgix.net/eb/d1/19/f1/9a64/4b2d/8471/d02314b53684/obi-wan-kenobi-in-the-original-star-wars.jpeg?crop=edges&fit=crop&auto=compress&h=1200&w=1200',
                },
                cursor: 'Y3Vyc29yLnBlb3BsZS4xMA==',
              },
              {
                node: {
                  id: 'people.12',
                  name: 'Wilhuff Tarkin',
                  image:
                    'https://vignette.wikia.nocookie.net/headhuntersholosuite/images/1/16/Wilhuff_Tarkin_003.jpg/revision/latest?cb=20100317214033',
                },
                cursor: 'Y3Vyc29yLnBlb3BsZS4xMg==',
              },
              {
                node: {
                  id: 'people.13',
                  name: 'Chewbacca',
                  image:
                    'https://cdn-s3.touchofmodern.com/products/000/618/953/7d97f903a587c703cfa91bfd35527975_large.jpg?1485457758',
                },
                cursor: 'Y3Vyc29yLnBlb3BsZS4xMw==',
              },
              {
                node: {
                  id: 'people.14',
                  name: 'Han Solo',
                  image:
                    'https://i.pinimg.com/originals/19/37/95/19379598fbb4338dd02e7ea8dde3ad63.jpg',
                },
                cursor: 'Y3Vyc29yLnBlb3BsZS4xNA==',
              },
            ],
            pageInfo: {
              hasNextPage: true,
              endCursor: 'Y3Vyc29yLnBlb3BsZS4xNA==',
            },
          },
        },
      },
    }),
  },
  {
    request: {
      query: EPISODE_QUERY,
      variables: { id: 'films.1', first: 5, after: 'Y3Vyc29yLnBlb3BsZS4xNA==' },
    },
    result: () => ({
      data: {
        episode: {
          id: 'films.1',
          title: 'A New Hope',
          episodeId: 4,
          openingCrawl:
            "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
          image: 'https://m.media-amazon.com/images/I/81r+LN-YReL._SS500_.jpg',
          director: 'George Lucas',
          releaseDate: '1977-05-25',
          people: {
            edges: [
              {
                node: {
                  id: 'people.1',
                  name: 'Luke Skywalker',
                  image:
                    'https://links.gunaxin.com/content/images/post_images/Luke_Skywalker_039_s_Original_039_Star_Wars_039_Lightsaber_Is_Going_Up_For_Auction_1544116268_4528.jpg',
                },
                cursor: 'Y3Vyc29yLnBlb3BsZS4x',
              },
              {
                node: {
                  id: 'people.10',
                  name: 'Obi-Wan Kenobi',
                  image:
                    'https://fsmedia.imgix.net/eb/d1/19/f1/9a64/4b2d/8471/d02314b53684/obi-wan-kenobi-in-the-original-star-wars.jpeg?crop=edges&fit=crop&auto=compress&h=1200&w=1200',
                },
                cursor: 'Y3Vyc29yLnBlb3BsZS4xMA==',
              },
              {
                node: {
                  id: 'people.12',
                  name: 'Wilhuff Tarkin',
                  image:
                    'https://vignette.wikia.nocookie.net/headhuntersholosuite/images/1/16/Wilhuff_Tarkin_003.jpg/revision/latest?cb=20100317214033',
                },
                cursor: 'Y3Vyc29yLnBlb3BsZS4xMg==',
              },
              {
                node: {
                  id: 'people.13',
                  name: 'Chewbacca',
                  image:
                    'https://cdn-s3.touchofmodern.com/products/000/618/953/7d97f903a587c703cfa91bfd35527975_large.jpg?1485457758',
                },
                cursor: 'Y3Vyc29yLnBlb3BsZS4xMw==',
              },
              {
                node: {
                  id: 'people.14',
                  name: 'Han Solo',
                  image:
                    'https://i.pinimg.com/originals/19/37/95/19379598fbb4338dd02e7ea8dde3ad63.jpg',
                },
                cursor: 'Y3Vyc29yLnBlb3BsZS4xNA==',
              },
            ],
            pageInfo: {
              hasNextPage: false,
              endCursor: 'Y3Vyc29yLnBlb3BsZS4xNABB',
            },
          },
        },
      },
    }),
  },
  {
    request: {
      query: EPISODE_QUERY,
      variables: { id: 'films.1', first: 5, after: 'Y3Vyc29yLnBlb3BsZS4xNABB' },
    },
    result: () => ({
      data: null,
    }),
  },
];

const errorMocks = [
  {
    request: {
      query: EPISODE_QUERY,
    },
    result: new Error('Test'),
  },
];

const EXAMPLE_PROPS = { match: { params: { episodeId: 'films.1' } } };

describe('<Episode />', () => {
  it('should match snapshot', () => {
    expect(
      shallow(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Episode {...EXAMPLE_PROPS} />
        </MockedProvider>,
      ),
    ).toMatchSnapshot();
  });

  it('should display Episode', async () => {
    const wrapper = mount(
      <Router>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Episode {...EXAMPLE_PROPS} />
        </MockedProvider>
      </Router>,
    );

    await wait(0);
    wrapper.update();

    expect(wrapper.find(EpisodePage)).toHaveLength(1);
    expect(wrapper.find(EpisodePage).find(LeftImageCard)).toHaveLength(5);
  });

  it('should redirect when error occurs', async () => {
    const wrapper = mount(
      <Router>
        <MockedProvider mocks={errorMocks} addTypename={false}>
          <Episode {...EXAMPLE_PROPS} />
        </MockedProvider>
      </Router>,
    );

    await wait(0);
    wrapper.update();

    expect(wrapper.find(Redirect)).toHaveLength(1);
  });

  it('should fetchMore', async () => {
    const wrapper = mount(
      <Router>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Episode {...EXAMPLE_PROPS} />
        </MockedProvider>
      </Router>,
    );

    await wait(10);
    wrapper.update();

    wrapper.find(Button).simulate('click');

    await wait(10);
    wrapper.update();

    expect(wrapper.find(EpisodePage).find(LeftImageCard)).toHaveLength(10);

    await wait(10);
    wrapper.update();

    expect(wrapper.find(EpisodePage).find(LeftImageCard)).toHaveLength(10);
    expect(wrapper.find(Button)).toHaveLength(0);
  });
});
