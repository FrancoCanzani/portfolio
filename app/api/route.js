export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Handle the POST request here
    console.log(req.body);
    res.status(200).json({ message: 'POST request handled' });
  } else {
    // Return a 405 Method Not Allowed error for other HTTP methods
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
