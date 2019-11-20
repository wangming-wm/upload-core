
import React from 'react';
import { Core } from '../src';

export default class extends React.Component {

  change = files => {
    console.log('files', files);
  }

  render() {
    return (
      <div>
        <h1></h1>
        <Core
          name="file"
          onChange={this.change}
          multiple
          filter={{
            image: {
              accept: ['JPG'],
            }
          }}
        >
          <span>upload</span>
        </Core>
      </div>
    )
  }
}