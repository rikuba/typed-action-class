# typed-action-class

Define Redux actions as classes and avoid code repetition in TypeScript.

- There is only 2 APIs
- There is no middleware
- It does not affect to reducer

By using this module,

- Simple actions can be written with 1 liner (You don't need to write functions that map argument to payload)
- Union type of all action interfaces can be derived automatically (You don't need to enumerate all action types with your hand)

## Install

```sh
npm install typed-action-class
```

## Usage

This section cite the [Redux Example: Reddit API](https://redux.js.org/docs/advanced/ExampleRedditAPI.html) for explanation.

### Use `Action` function to define action classes

```typescript
// actions/creators.ts

import { Action } from 'typed-action-class';

export class SelectSubreddit extends Action('SELECT_SUBREDDIT')<{ subreddit: string }> {}

export class InvalidateSubreddit extends Action('INVALIDATE_SUBREDDIT')<{ subreddit: string }> {}

export class RequestPosts extends Action('REQUEST_POSTS')<{ subreddit: string }> {}

export class ReceivePosts extends Action('RECEIVE_POSTS')<{
  subreddit: string;
  posts: string[];
  receivedAt: number;
}> {
  constructor(subreddit: string, json: any) {
    super({
      subreddit,
      posts: json.data.children.map((child: { data: string }) => child.data),
      receivedAt: Date.now()
    });
  }
}
```

### Use `UniteActions` type to export union type of all action interfaces

```typescript
// actions/index.ts

import { UniteActions } from 'typed-action-class';
import * as actions from './creators';

export * from './creators';
export type Action = UniteActions<typeof actions>;
```

### Reducer as usual

```typescript
// reducers/index.ts

import { Action } from '../actions';

const postsBySubreddit = (state = {}, action: Action) => {
  switch (action.type) {
    case 'RECEIVE_POSTS':
      // action is narrowed to ReceivePosts interface
      action.payload.posts;
      break;
  }
}
```

### Dispatch action instances

```typescript
// containers/app.tsx

// ...
import { SelectSubreddit } from '../actions';

const mapDispatchToProps = (dispatch: Dispatch<State>) => ({
  handleChange: (value: string) => {
    dispatch(new SelectSubreddit({ subreddit: value }));
  }
});
```

## License

[Unlicense](LICENSE)
