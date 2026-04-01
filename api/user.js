// api/user.js
import request from '../utils/request';

export const getAvatar = (user_id) => {
    return request({
        url: '/user/avatarUrl',
        method: 'GET',
        data: { user_id }
     });
};
export const updateUser=(user)=>{
    return request({
        url:'/user/update',
        method:'POST',
        data:user
    })
}