function registration(state, action) {
  const me = action.caller;
  const role = action.input.role;

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
  const dcount = parseInt(state.dcount)

  const docData = {
    fileName: action.input.fileName,
    date: (new Date()).toString(),
    hash: action.input.hash,
    sharedTo: []
  }

  state.data[me].docs[(dcount + 1).toString()] = docData;
  state.dcount = (dcount + 1);
  return { state };
}

function fetchMine(state, action) {
  const me = action.input.addrs;
  return { result: state.data[me] };
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
  const input = action.input
  switch (input.function) {
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