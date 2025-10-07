"use client";

import { useEffect, useState } from 'react';
import { 
  getAllUsers, 
  addUser, 
  updateUser, 
  deleteUser, 
  getUsersByClass,
  getUsersByYear,
  subscribeToUsers,
  User 
} from '../../lib/firebase/firestore';

export default function FirebaseExample() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUserNickname, setNewUserNickname] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserYears, setNewUserYears] = useState('');
  const [newUserClass, setNewUserClass] = useState('');

  // 🔍 データ取得
  const loadUsers = async () => {
    setLoading(true);
    try {
      const userList = await getAllUsers();
      setUsers(userList);
    } catch (error) {
      console.error('ユーザー取得エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 リアルタイム監視
  useEffect(() => {
    const unsubscribe = subscribeToUsers((userList) => {
      setUsers(userList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 📝 ユーザー追加
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserNickname || !newUserEmail) return;

    const userId = await addUser({
      nickname: newUserNickname,
      email: newUserEmail,
      password: newUserPassword || 'defaultpass',
      years: newUserYears || '2024',
      class: newUserClass || 'A組',
      created_at: new Date()
    });

    if (userId) {
      setNewUserNickname('');
      setNewUserEmail('');
      setNewUserPassword('');
      setNewUserYears('');
      setNewUserClass('');
      // データ再取得（リアルタイム監視を使用していない場合）
      const userList = await getAllUsers();
      setUsers(userList);
    }
  };

  // ✏️ ユーザー更新
  const handleUpdateUser = async (userId: string, newNickname: string) => {
    const success = await updateUser(userId, { nickname: newNickname });
    if (success) {
      const userList = await getAllUsers();
      setUsers(userList);
    }
  };

  // 🗑️ ユーザー削除
  const handleDeleteUser = async (userId: string) => {
    if (confirm('本当に削除しますか？')) {
      const success = await deleteUser(userId);
      if (success) {
        const userList = await getAllUsers();
        setUsers(userList);
      }
    }
  };

  // 🔍 クラス別検索
  const handleSearchByClass = async (className: string) => {
    setLoading(true);
    try {
      const userList = await getUsersByClass(className);
      setUsers(userList);
    } catch (error) {
      console.error('クラス検索エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  // 🔍 学年別検索
  const handleSearchByYear = async (year: string) => {
    setLoading(true);
    try {
      const userList = await getUsersByYear(year);
      setUsers(userList);
    } catch (error) {
      console.error('学年検索エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">🔥 Firebase テスト</h1>
      
      {/* 📝 ユーザー追加フォーム */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">新しいユーザーを追加</h2>
        <form onSubmit={handleAddUser} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="ニックネーム"
              value={newUserNickname}
              onChange={(e) => setNewUserNickname(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              placeholder="メールアドレス"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              placeholder="パスワード"
              value={newUserPassword}
              onChange={(e) => setNewUserPassword(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="学年 (例: 2024)"
              value={newUserYears}
              onChange={(e) => setNewUserYears(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="クラス (例: A組)"
              value={newUserClass}
              onChange={(e) => setNewUserClass(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              ユーザー追加
            </button>
          </div>
        </form>
      </div>

      {/* 🔍 検索・操作ボタン */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">データ操作</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={loadUsers}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            全ユーザー取得
          </button>
          <button
            onClick={() => handleSearchByClass('A組')}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            A組で検索
          </button>
          <button
            onClick={() => handleSearchByClass('B組')}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            B組で検索
          </button>
          <button
            onClick={() => handleSearchByYear('2024')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            2024年度で検索
          </button>
          <button
            onClick={() => handleSearchByYear('2023')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            2023年度で検索
          </button>
        </div>
      </div>

      {/* 📊 ユーザー一覧 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          ユーザー一覧 ({users.length}件)
        </h2>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">読み込み中...</p>
          </div>
        ) : users.length === 0 ? (
          <p className="text-center py-8 text-gray-500">ユーザーが見つかりません</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <div key={user.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="space-y-2">
                  <p><strong>ID:</strong> <span className="text-sm text-gray-600">{user.id}</span></p>
                  <p><strong>ニックネーム:</strong> {user.nickname}</p>
                  <p><strong>メール:</strong> {user.email}</p>
                  <p><strong>学年:</strong> {user.years}</p>
                  <p><strong>クラス:</strong> {user.class}</p>
                  <p><strong>作成日:</strong> {user.created_at?.toLocaleString()}</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => {
                      const newNickname = prompt('新しいニックネームを入力:', user.nickname);
                      if (newNickname) handleUpdateUser(user.id!, newNickname);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    編集
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id!)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    削除
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}