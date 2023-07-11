import User from './User';

export default function UserTable({ users }) {
    const rows = users.map((user) => (
        <User user={user} key={user._id} />
    ));

    return (
        <table>
            <thead>
                <tr>
                    <th>Full Name</th>
                    <th>Username</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}