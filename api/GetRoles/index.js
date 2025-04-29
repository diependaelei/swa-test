const fetch = require('node-fetch').default;

module.exports = async function (context, req) {
    const user = req.body || {};
    const roles = getUserGroups(user);

    context.res.json({
        roles: ["admin"]
    })

    //context.res.json({
    //    roles
    //});
}

async function getUserGroups(bearerToken) {
    const url = new URL('https://graph.microsoft.com/v1.0/me/memberOf');
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${bearerToken}`
        },
    });

    if (response.status !== 200) {
        return [];
    }

    const graphResponse = await response.json();
    const groups = graphResponse.value.map(group => group.displayName);
    return groups;
}