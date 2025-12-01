import React from 'react';

function UserList({ users }) {
  return (
    <div className="p-4">
      <h4 className="text-slate-300 text-sm font-medium">Active Users</h4>

      <ul className="mt-4 space-y-2">
        {users.map((u, i) => (
          <li
            key={i}
            className="text-white text-sm flex items-center gap-2 bg-slate-800/40 px-3 py-2 rounded-lg border border-slate-700"
          >
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-semibold">
              {u[0]?.toUpperCase() || '?'}
            </div>
            <span>{u}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
