export default async function handler(req, res) {
  const foo = await fetch('http://localhost:6532/api/toJSON/tct');
  res.status(200).json(await foo.json());
}
