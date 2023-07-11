import Post from './Post';

export default function PostTable({ posts }) {
    const rows = [];

    posts.forEach((post) => {
        // each post and push them inside the array with the Post component (have not made)
        rows.push(
            <Post
                post={post}
                key={post._id} />
        );
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>Posts</th>
                    { /* <th>Comments</th> */}
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}