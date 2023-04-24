import jwtDecode from 'jwt-decode';
import { useState, useEffect } from 'react'
import { Payload } from '../tyoes/payload';

export const useAuth = () => {
    const [authInfo, setAuthInfo] = useState<{
        checked: boolean,           // 認証のチェック状態が済んでいるかどうか
        isAuthenticated: boolean    // 認証済みかチェック
    }>({checked: false, isAuthenticated: false});

    useEffect(() => {
        // tokenキーでローカルから情報を取得する
        const token = localStorage.getItem('token');
        try {
            if(token) {
                // tokenに不正な値が入った時にエラーが発生する為、try-catch内で実装する
                const decodedToken = jwtDecode<Payload>(token);
                // UNIX形式時間
                // 有効期限が切れている時
                if (decodedToken.exp * 1000 < Date.now()) {
                    localStorage.removeItem('token');
                    setAuthInfo({checked: true, isAuthenticated: false});
                // 有効期限が切れていない時
                } else {
                    setAuthInfo({checked: true, isAuthenticated: true});
                }
            // トークンが存在しない時
            } else {
                setAuthInfo({checked: true, isAuthenticated: false});
            }
        } catch (error) {
            setAuthInfo({checked: true, isAuthenticated: false});
        }
    }, []);

    return authInfo;
}