let clients = [];

// export const connectSSE = (req, res) => {
//   res.setHeader("Content-Type", "text/event-stream");
//   res.setHeader("Cache-Control", "no-cache");
//   res.setHeader("Connection", "keep-alive");

//   res.flushHeaders();

//   const clientId = Date.now();
//   clients.push({ id: clientId, res });

//   req.on("close", () => {
//     clients = clients.filter((c) => c.id !== clientId);
//   });
// };

let listeners = [];

export const addListener = (res) => {
  listeners.push(res);
};

export const removeListener = (res) => {
  listeners = listeners.filter(l => l !== res);
};

export const pushNotification = (data) => {
  clients.forEach((client) => {
    client.res.write(`data: ${JSON.stringify(data)}\n\n`);
  });
};
