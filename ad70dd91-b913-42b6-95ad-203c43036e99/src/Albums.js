import { fetchData } from './data.js';

// 注意：这个组件使用了一个实验性的 API
// 该 API 并未在 React 的稳定版本中可用

// 对于一个现实的例子，你可以尝试一个
// 与 Suspense 集成的框架，例如 Relay 或 Next.js。

export default function Albums({ artistId }) {
  const albums = use(fetchData(`/${artistId}/albums`));
  return (
    <ul>
      {albums.map(album => (
        <li key={album.id}>
          {album.title} ({album.year})
        </li>
      ))}
    </ul>
  );
}

// 这是一个解决 bug 的临时方案，以便让演示运行起来。
// TODO：当 bug 修复后，用真正的实现替换。
function use(promise) {
  if (promise.status === 'fulfilled') {
    return promise.value;
  } else if (promise.status === 'rejected') {
    throw promise.reason;
  } else if (promise.status === 'pending') {
    throw promise;
  } else {
    promise.status = 'pending';
    promise.then(
      result => {
        promise.status = 'fulfilled';
        promise.value = result;
      },
      reason => {
        promise.status = 'rejected';
        promise.reason = reason;
      },      
    );
    throw promise;
  }
}
