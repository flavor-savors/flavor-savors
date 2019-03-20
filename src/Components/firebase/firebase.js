
import firebase from 'firebase';

const config = {
    "type": "service_account",
    "project_id": "flavor-savor",
    "private_key_id": "f6e75a4037aecb883e756195be78f30461da43dd",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCg+fNawxMA4pYd\niKipzvysqGk/By/O4dF4ijPLOGaxinkK7CBetEq+/5UUcwKWdJfFmD/Hm98oJlFC\nNXYZStkbxJvBVeeaEe2SmpKDuLXe0fCbw6sB4C/TmYoWmBml/qLLR43ycXEFKTyy\nJesraIpOFI6MrtK3HU74zYFPmmWmPtCTwwG1j3QtbIGmC9bYE+9o/GrlK/QnNNE+\n0J4OUuLX17w0mZf03znatKyzxXr8P7VFx9TBTVmYyzLQLh2tDB8zK+gCj6xA+0Mf\nn4KiU8lTc0v4NN7QPMcrYj/7F1QGlFxNu21kJ6TJAmHKki1CUDnnPGlPKSn1G2xm\nuPCx2Fi1AgMBAAECggEAGaFqiqU8OZwaODYZ2r2q9Ae1iDRJ+6fvXQCuOflvOm34\nk1Fg3wtYSlxx3WlpfFCwmKTC5PKPv7oIHqFZ/jFxa48smIYnw9t+ZuUHFoN6q7Fk\nHLz1Fa2fF9MezjWmAczPGUw5kORYkTCNajUI4ma4/LEfuE0enkrDl/BKmkTUUfl1\n+gKiqHF7OeIykc8Zo6qswdVbgD6Vukzt6nKEuPvIcvGlCtq6PJ26rlQ4BdXZ1EFH\nTcM7dfd+kqTkVmSYqw20sFNZkxO3i1qiXFVokJzpjtrzQYW6uk92oquG21scRsHV\ndJsOY4YHb5ZVn6LUj/412ivHDZbfzGwZ9MRXNLNWqQKBgQDezfxHzJ3BVlM8ksyE\nLDl4DpFmDT0vKnNnrTvJam++har+nuvft3FHAYL/zqTZELaJC5Qe/G7e6aGVlPPm\nVHXrtxJmFAh0/9RoPSWitJbYuWy8K8F7CRfCRfrJOQOE0TYI4z92XGE4Rg2x4iCH\n/aqOkTgHqF6tfqsrY7fmw236aQKBgQC49cRax5sfRmvCKJsMadBihi08T596aiof\nLiYpkZQ+fIeG21c5k+qudDeMcsF85xYlfFyQoG6RsXN/O3ZMCUqs2cxEPPd0BaKu\noI96l8eYbZuRm9BJFzkdAll/Ym21dsJylk6HeyuFWtr+2E7mwh9p+15+SQg9UZLI\nFWpM0IOqbQKBgBOzfSJQKobk/jk19dWeH3rJNvwiIY3hIBFD1SyLN9RN93/KR6sh\nimev74h1GkiDXNCjcHaI9bjKSdpzMFnmkALGzl6uWM0Xrg2FkqVfeJMzWjUNXW9m\nr24jR/ixDOmaoj+I8JyjsIkMULuw9hVwTbuLhbvPnIeU0sfkameCUmA5AoGAK0xt\ncQr1R3cG1ucGlPtYaxgaEtpY7SFZRv9Ys7Z+y7n/SBSk8Let4rUWI+zhWsoGJzRb\nvwevmq+95/UVlms+bgR2iyryitie4t53eC177jUKjCW7tsCXADGCng1+vVJV5tlE\n/PZak9dXGP2uStr626aa0llqcmBcSjapMd5GVGkCgYBn51fxbQB6WnMJhKEdHLvz\nFeUBqQUp2Do1DrPg/Mukig4KmuDv3rtxrSdQwAkm5Yti0rOQnXU0ra4X5S+XvwAV\n7wl4Y+AO8LcqvTl4WUa8Hq1+6xsmNFyi6SMidIYpx3Fhp2xFMxi3GBnNIlkrXPGk\nAYYpWO31I9WX1mi3xMyM5g==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-dvo6n@flavor-savor.iam.gserviceaccount.com",
    "client_id": "102425081587324416988",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-dvo6n%40flavor-savor.iam.gserviceaccount.com"
};

firebase.initializeApp(config);

export default firebase;