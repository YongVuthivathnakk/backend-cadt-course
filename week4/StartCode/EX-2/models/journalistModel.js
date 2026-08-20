import { getArticles } from "./articleModel.js";


const journalists = [
  { id: 1, name: "Alice Johnson", email: "alice.johnson@newsco.com" },
  { id: 2, name: "Bob Martinez", email: "bob.martinez@newsco.com" },
  { id: 3, name: "Clara Lee", email: "clara.lee@newsco.com" },
];

export function getJournalists() {
  return journalists;
}

export function getJournalistById(id) {
  return journalists.find((journalist) => journalist.id === id);
}

export function createJournalist(name, email) {
  const newJournalist = {
    id: journalists.length + 1,
    name: name,
    email: email,
  };

  journalists.push(newJournalist);
  return newJournalist;
}

export function updateJournalist(id, name, email) {
  const journalist = getJournalistById(id);
  if (name) journalist.name = name;
  if (email) journalist.email = email;

  return journalist;
}

export function deleteJournalist(id) {
  const index = journalists.findIndex((journalist) => journalist.id === id);
  if (index === -1) {
    return false;
  }
  journalists.splice(index, 1);
  return true;
}

export function getArticlesByJournalistId(journalistId) {
  return getArticles().filter(
    (article) => article.journalistId === journalistId
  );
}
