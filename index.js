const express = require("express");
const Agora = require("agora-access-token");

const app = express();
app.use(express.json());

app.post("/rtctoken", (req, res) => {
  const appID = "e004df68b67841a1b6ea7c08b7225814";
  const appCertificate = "521c7307f1d547e080c34585dd20662e";
  const expirationTimeInSeconds = 3600;
  const uid = Math.floor(Math.random() * 100000);
  const role = req.body.isPublisher ? Agora.RtcRole.PUBLISHER : Agora.RtcRole.SUBSCRIBER;
  const channel = req.body.channel;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const expirationTimestamp = currentTimestamp + expirationTimeInSeconds;

  const token = Agora.RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channel, uid, role, expirationTimestamp);
  res.send({ uid, token });
});

app.post("/rtmtoken", (req, res) => {
  const appID = "e004df68b67841a1b6ea7c08b7225814";
  const appCertificate = "521c7307f1d547e080c34585dd20662e";
  const user = req.body.user;
  const role = Agora.RtmRole.Rtm_User;
  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const expirationTimestamp = currentTimestamp + expirationTimeInSeconds;

  const token = Agora.RtmTokenBuilder.buildToken(appID, appCertificate, user, role, expirationTimestamp);
  res.send({ token });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Agora Auth Token Server listening at Port ${port}`));
