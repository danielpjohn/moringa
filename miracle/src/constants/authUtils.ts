//authUtils.ts
export const isUserAdmin = (userData: any) => {
  if (!userData) return false;
  
  return userData.username === 'admin' || 
         userData.role === 'Admin' || 
         userData.role === 'admin' ||
         userData.is_staff === true ||
         userData.is_superuser === true;
};