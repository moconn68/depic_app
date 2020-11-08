import {
    player_icons,
} from '../common/assets';

const PLAYERS = [
    {
        name: "p1",
        icon: player_icons.p1,
    },
    {
        name: "p2",
        icon: player_icons.p2,
    },
    {
        name: "p3",
        icon: player_icons.p3,
    },
    {
        name: "p4",
        icon: player_icons.p4,
    },
    {
        name: "p5",
        icon: player_icons.p5,
    },
    {
        name: "p6",
        icon: player_icons.p6,
    },
    {
        name: "p7",
        icon: player_icons.p7,
    },
    {
        name: "p8",
        icon: player_icons.p8,
    },
    {
        name: "p9",
        icon: player_icons.p9,
    },
    {
        name: "p10",
        icon: player_icons.p10,
    },
    {
        name: "p11",
        icon: player_icons.p11,
    },
    {
        name: "p12",
        icon: player_icons.p12,
    },
    
  ];

  export function getPlayerIcon(playerName) {
    for(let player of PLAYERS)
    {
      if(player.name == playerName)
      {
        return player.icon;
      }
    }
  }

  export function getPlayerName(playerIcon) {
      for(let player of PLAYERS) {
          if(player.icon == playerIcon) {
              return player.name;
          }
      }
  }

  export function getNumCharacters() {
      return PLAYERS.length;
  }