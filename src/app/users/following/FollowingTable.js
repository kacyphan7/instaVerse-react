import Following from './Following';

export default function FollowerTable({ followings }) {
    const rows = [];

    followings.forEach((following) => {
        rows.push(
            <Following
                following={following}
                key={follower._id} />
        );
    });

    const expirationTime = new Date(parseInt(localStorage.getItem('expiration')) * 1000);
    let currentTime = Date.now();

    // make a condition that compares exp and current time
    if (currentTime >= expirationTime) {
        handleLogout();
        alert('Session has ended. Please login to continue.');
        router.push('/users/login');
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Following</th>
                    { /* <th>Comments</th> */}
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}