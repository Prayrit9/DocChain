function registration(state, action) {
  const addrs = action.caller;
  const role = action.input.role;
  const fileName = action.input.fileName;
  const ipfs = action.input.ipfs;
  const date = action.input.date;
  const id = action.input.id;
  const arr = [];
  arr.push(id);
  // const shareTo=action.input.shareTo;

  const map = {};
  map[addrs] = arr;

  state.data[action.caller] = {
    address: addrs,
    role: role,
    docs: {
      fileName: fileName,
      ipfs: ipfs,
      date: date,
    },
    share: addrs in map,
  };
  return { state };
}

function newDoc(state, action) {
  ContractAssert(
  state.data[action.caller].address === action.caller,"Wrong address to access your data");
  const fileName = action.input.fileName;
  const ipfs = action.input.ipfs;
  const date = action.input.date;

  state.data[action.caller].docs.fileName = fileName;
  state.data[action.caller].docs.ipfs = ipfs;
  state.data[action.caller].docs.date = date;
  return { state };
}

function fetch(state, action) {
  const addrs = action.input.addrs;
  return { result: state.data[addrs] };
}

function giveAccess(state, action) {
  ContractAssert(
  state.data[action.caller].address === action.caller,"Wrong address to access your data");
  const id = action.input.id;

  state.data[action.caller].share.push(id);
  const map = {};
  map[action.caller] = state.data[action.caller].share;
  state.data[action.caller].share = action.caller in map;
  return { state };
}
