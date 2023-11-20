
function iExist(state, action) {
  const me = action.caller;
  const myData = state.data[me];
  if (!myData) {
    return { result: false };
  }
  return { result: true };
}

function registration(state, action) {
  const me = action.caller;
  const role = action.input.role;

  if (iExist(state, action).result) return { state };

  const meData = {
    role: role,
    docs: {},
    sharedWithMe: {}
  }

  state.data[me] = meData;

  return { state };
}

function newDoc(state, action) {
  const me = action.caller;
  const dcount = state.dcount + 1

  const docData = {
    fileName: action.input.fileName,
    date: (new Date()).toString(),
    hash: action.input.hash,
    sharedTo: []
  }

  console.log(docData);

  const myDocs = state.data[me].docs;
  myDocs[dcount] = docData;

  // state.data[me].docs = myDocs;
  state.dcount = dcount;
  return { state };
}

function fetchMine(state, action) {
  const me = action.caller;
  const meData = state.data[me];
  if (!meData) {
    return {
      result: {
        docs: {},
        sharedWithMe: {}
      }
    };
  }
  return { result: meData };
}

function giveAccess(state, action) {
  const me = action.caller;

  const docId = action.input.docId;
  const shareWith = action.input.shareWith;

  const myDocs = state.data[me].docs;

  const myDocIds = Object.keys(myDocs);

  if (!myDocIds.includes(docId)) {
    throw new ContractError(`You don't own this doc`);
  }

  const prevSharedWithMe = myDocs[docId].sharedWithMe[shareWith];
  if (!prevSharedWithMe) {
    prevSharedWithMe = [];
  }
  if (!prevSharedWithMe.includes(shareWith)) {
    prevSharedWithMe.append(shareWith);
  }

  const mySharedTo = myDocs[docId].sharedTo;

  myDocs[docId].sharedWithMe[shareWith] = prevSharedWithMe;
  state.data[me].docs = myDocs;

  return { state };

}

export function handle(state, action) {
  switch (action.input.function) {
    case 'iExist':
      return iExist(state, action)
    case 'registration':
      return registration(state, action)
    case 'newDoc':
      return newDoc(state, action)
    case 'fetchMine':
      return fetchMine(state, action)
    case 'giveAccess':
      return giveAccess(state, action)
    default:
      throw new ContractError(`Errrrorrrrrrrr`)
  }
}