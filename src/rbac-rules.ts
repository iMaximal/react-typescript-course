export const rules = {
  visitor: {
    static: ['dashboard-page:visit', 'users:selfEdit', 'chart:view'],
  },
  moderator: {
    static: ['dashboard-page:visit', 'users:get', 'users:selfEdit', 'chart:view'],
    dynamic: {
      'users:edit': ({ userId, openedUserId }) => {
        if (!userId || !openedUserId) return false
        return userId === openedUserId
      },
    },
  },
  admin: {
    static: ['users:get', 'users:selfEdit', 'users:edit', 'dashboard-page:visit', 'chart:view'],
  },
}
