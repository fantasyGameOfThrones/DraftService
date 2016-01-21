import {expect} from 'chai';


import io from'socket.io/node_modules/socket.io-client';

let socket, state;
describe ('draft test', () => {

  beforeEach((done) => {
    socket = io.connect('http://localhost:8080');

    socket.on('sendLeagueId', () => {
      socket.emit('returnLeagueId', {league_id: 1})
    });

    socket.on('updateStore', (s) => {
      state = s;
    });

    setTimeout(() => {
      done();
    },100);

  });

  afterEach((done) => {
    socket.emit('reset');
    socket.disconnect();
    setTimeout(()=>{
      done();
    },50);
  });

  it('should ping moose and receive lemur', (done) => {
    var ping = 'not lemur';
    socket.emit('moose');
    socket.on('lemur', () => ping = 'lemur');
    setTimeout(() => {
      expect(ping).to.equal('lemur');
      done();
    }, 50);
  });

  it('should initialize user', (done) => {
    socket.emit('init','1534');
    socket.emit('init', '3047');

    setTimeout(()=>{
      expect(state.teams.filter((team) => team.id === 1534)[0].loggedOn).to.equal(true);
      expect(state.teams.filter((team) => team.id === 3047)[0].loggedOn).to.equal(true);
      done();
    }, 50);

  });

  it('should start draft', (done) => {
    socket.emit('init','1534');
    socket.emit('init','3047');
    socket.emit('startDraft');
    setTimeout(() => {
      expect(state.draftStatus).to.equal('MID_DRAFT');
      done();
    }, 50);
  });

  it('should put a character on a team', (done) => {
    let count = 0;
    socket.emit('init','1534');
    socket.emit('init','3047');
    socket.emit('startDraft');
    setTimeout(() => {
      socket.emit('draftCharacter', {team_id: state.order[count].toString(), char_id: ++count})
    },50)
    setTimeout(() => {
      socket.emit('draftCharacter', {team_id: state.order[count].toString(), char_id: ++count})
    },100);
    setTimeout(() => {
      expect(state.teams.filter((team)=> team.id === 1534)[0].characters.length).to.equal(1);
      expect(state.teams.filter((team)=> team.id === 3047)[0].characters.length).to.equal(1);
      done();
    },200);
  });

  
  it('should complete a draft', (done) => {
    socket.emit('init','1534');
    socket.emit('startDraft');

    (function drafter(i){
      if(i < state.order.length){
        setTimeout(() => {
          socket.emit('draftCharacter' , {team_id: state.order[i].toString(), char_id: i+1})
          if(i < state.order.length){
            drafter(i + 1);
          }
        },30);
      }
    }(0));

    // setTimeout(()=>{
      // caller(0);
    // },50)

    setTimeout(()=> {
      expect(state.teams.filter((team)=> team.id === 1534)[0].characters.length).to.equal(6);
      expect(state.draftStatus).to.equal('POST_DRAFT');
      done();
    },(30*state.order.length));
  })

})