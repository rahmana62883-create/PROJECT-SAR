import React from 'react';
import { useChat } from '../context/ChatContext';

export const AdminChatDashboard = () => {
  const { adminLogs, reportedMessages, blockedUsers, blockUser } = useChat();

  const handleBan = (username) => {
    if(window.confirm(`Are you sure you want to mock ban ${username}?`)) {
      blockUser(username);
    }
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-fc-border">
        <h1 className="text-2xl font-bold text-fc-primary tracking-tight">Community Moderation</h1>
        <p className="text-xs text-fc-secondary mt-0.5">Monitor Stranger Chat and Topic Rooms</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Reports Panel */}
        <div className="bg-fc-surface border border-fc-border rounded-fc-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-fc-border">
            <h3 className="text-sm font-bold text-fc-primary uppercase tracking-wider">Flagged Messages</h3>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 font-bold">{reportedMessages.length} Pending</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-fc-border text-[10px] font-semibold uppercase tracking-wider text-fc-secondary bg-fc-base/50">
                  <th className="px-3 py-2.5">Message ID</th>
                  <th className="px-3 py-2.5">Reason</th>
                  <th className="px-3 py-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-fc-border/60">
                {reportedMessages.length === 0 ? (
                  <tr><td colSpan="3" className="text-center py-6 text-fc-secondary">No reports.</td></tr>
                ) : (
                  reportedMessages.map((r, i) => (
                    <tr key={i} className="hover:bg-fc-glass transition-colors">
                      <td className="px-3 py-2.5 font-mono text-fc-primary">{r.msgId}</td>
                      <td className="px-3 py-2.5"><span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-fc-danger font-semibold">{r.reason}</span></td>
                      <td className="px-3 py-2.5 text-right">
                        <button className="text-fc-danger font-semibold hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Blocked Users */}
        <div className="bg-fc-surface border border-fc-border rounded-fc-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-fc-border">
            <h3 className="text-sm font-bold text-fc-primary uppercase tracking-wider">Blocked/Banned Users</h3>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-red-500/10 text-fc-danger font-bold">{blockedUsers.length} Users</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-fc-border text-[10px] font-semibold uppercase tracking-wider text-fc-secondary bg-fc-base/50">
                  <th className="px-3 py-2.5">Username</th>
                  <th className="px-3 py-2.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-fc-border/60">
                {blockedUsers.length === 0 ? (
                  <tr><td colSpan="2" className="text-center py-6 text-fc-secondary">No banned users.</td></tr>
                ) : (
                  blockedUsers.map((u, i) => (
                    <tr key={i} className="hover:bg-fc-glass transition-colors">
                      <td className="px-3 py-2.5 font-bold text-fc-primary">{u}</td>
                      <td className="px-3 py-2.5 text-right"><span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-fc-danger font-bold">Banned</span></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-fc-surface border border-fc-border rounded-fc-2xl p-6 shadow-sm space-y-4">
        <div className="pb-3 border-b border-fc-border">
          <h3 className="text-sm font-bold text-fc-primary uppercase tracking-wider">Real-time Activity Log</h3>
        </div>
        <div className="overflow-x-auto max-h-[350px]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-fc-border text-[10px] font-semibold uppercase tracking-wider text-fc-secondary bg-fc-base/50">
                <th className="px-4 py-2.5">Time</th>
                <th className="px-4 py-2.5">Event Type</th>
                <th className="px-4 py-2.5">Details</th>
                <th className="px-4 py-2.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-fc-border/60">
              {adminLogs.slice().reverse().map(log => (
                <tr key={log.id} className="hover:bg-fc-glass transition-colors">
                  <td className="px-4 py-2.5 text-fc-secondary font-mono">{new Date(log.timestamp).toLocaleTimeString()}</td>
                  <td className="px-4 py-2.5"><span className="text-[10px] px-2 py-0.5 rounded-full bg-fc-base border border-fc-border text-fc-primary font-bold">{log.type}</span></td>
                  <td className="px-4 py-2.5 text-fc-primary">{log.detail}</td>
                  <td className="px-4 py-2.5 text-right">
                    {log.type === 'USER_JOINED' && (
                       <button className="text-fc-danger font-semibold hover:underline" onClick={() => handleBan(log.detail.split(' ')[4])}>Ban</button>
                    )}
                  </td>
                </tr>
              ))}
              {adminLogs.length === 0 && (
                <tr><td colSpan="4" className="text-center py-6 text-fc-secondary">No activity yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
