// Dependencies
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// Actions
import * as actions from '../../../containers/Blog/actions';

// Utils
import { isFirstRender, loadComponent } from '../../../../lib/utils/frontend';

// Components
const Helmet = loadComponent('Ui/Helmet');
const Link = loadComponent('Ui/Link');

class Post extends React.Component {
  static propTypes = {
    __: PropTypes.object.isRequired,
    loadSinglePost: PropTypes.func.isRequired,
    post: PropTypes.object,
    posts: PropTypes.array,
    singlePost: PropTypes.array
  };

  constructor(props) {
    super(props);

    this.state = {
      post: false
    };
  }

  componentWillMount() {
    const { year, month, day, slug, posts } = this.props;

    if (year && month && day && slug) {
      const post = posts.filter(post => {
        return post.year === year && post.month === month && post.day === day && post.slug === slug;
      });

      if (post.length === 1) {
        this.setState({
          post
        });
      } else {
        this.props.loadSinglePost(year, month, day, slug);
      }
    }
  }

  getPostData(post, key, single = false) {
    const { year, month, day, slug, title, excerpt, content } = post;
    const url = `blog/${year}/${month}/${day}/${slug}`;

    return {
      title,
      url,
      content: single ? content : excerpt,
      key,
      single
    };
  }

  renderPostBody(post) {
    const { title, url, content, key, single } = post;
    let helmet;

    if (single) {
      helmet = <Helmet title={title} meta={[{ name: 'description', content: content } ]} />;
    }

    return (
      <div className="Post" key={key}>
        {helmet}

        <h2>
          <Link to={url}>{title}</Link>
        </h2>

        <p className="information">
          Posted <span className="author">by <Link to="#">Codejobs</Link></span> on November 19th, 2017.
        </p>

        <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    );
  }

  renderSinglePost(post) {
    return this.renderPostBody(this.getPostData(post[0], 0, true));
  }

  renderPost(post, key) {
    return this.renderPostBody(this.getPostData(post, key));
  }

  render() {
    const { post, key, singlePost } = this.props;

    if (post) {
      return this.renderPost(post, key);
    } else if (!isFirstRender(this.state.post ? this.state.post : singlePost)) {
      return this.renderSinglePost(this.state.post ? this.state.post : singlePost);
    }

    return null;
  }
}

export default connect(state => ({
  __: state.content.__,
  posts: state.blog.posts,
  singlePost: state.blog.post
}), actions)(Post);
