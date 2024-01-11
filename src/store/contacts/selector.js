export const getFilter = (state) => state.filter;

const filterSelector = (state) => {
  const { item } = state.contacts.contacts;
  const { filter } = state;

  return item.filter((contact) => {
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });
};

export default filterSelector;
