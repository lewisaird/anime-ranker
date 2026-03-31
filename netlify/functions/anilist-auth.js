exports.handler = async (event) => {
  const { code } = event.queryStringParameters || {};

  if (!code) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing code' }) };
  }

  try {
    const response = await fetch('https://anilist.co/api/v2/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id:     process.env.ANILIST_CLIENT_ID,
        client_secret: process.env.ANILIST_CLIENT_SECRET,
        redirect_uri:  process.env.ANILIST_REDIRECT_URI,
        code
      })
    });

    const data = await response.json();

    if (data.access_token) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_token: data.access_token })
      };
    }

    return {
      statusCode: 400,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
