import { useResetRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import * as _ from "lodash"
import {
  get,
  set,
  buildTeeArray,
  createPlayersArray,
  getGender,
  computeCourseHandicaps,
} from "utils"
import * as state from "store"

export default function useLoadSavedLineup() {
  const setCourse = useSetRecoilState(state.course)
  const setGroup = useSetRecoilState(state.group)
  const setLineupTitle = useSetRecoilState(state.lineupTitle)
  const setPlayingDate = useSetRecoilState(state.playingDate)
  const setTeamTables = useSetRecoilState(state.teamTables)
  const resetTeamTables = useResetRecoilState(state.teamTables)
  const setLinkTime = useSetRecoilState(state.linkTime)
  const setTeeTimeCount = useSetRecoilState(state.teeTimeCount)
  const setTextareaValue = useSetRecoilState(state.textareaValue)
  const setProgs069 = useSetRecoilState(state.progs069)
  const setProgAdj = useSetRecoilState(state.progAdj)
  const setTeesSelected = useSetRecoilState(state.teesSelected)
  const setPlayersInLineup = useSetRecoilState(state.playersInLineup)
  const sortOrder = useRecoilValue(state.sortOrder)
  const setShowMissingPlayerModal = useSetRecoilState(
    state.showMissingPlayerModal
  )
  const setMissingPlayerMessage = useSetRecoilState(state.missingPlayerMessage)

  function loadSavedLineup({
    title,
    playersInLineup,
    players,
    course,
    game,
    games,
    linkTime,
    playingDate,
    progs069,
    progAdj,
    teamTables,
    teeTimeCount,
    textareaValue,
    teesSelected,
  }) {
    let missingPlayer = false
    setTeesSelected(teesSelected)
    setLineupTitle(title)
    setCourse(course)
    setGroup(game)
    set("groups", games)
    setLinkTime(linkTime)
    setPlayingDate(playingDate)
    setProgs069(progs069)
    setProgAdj(progAdj)
    if (teamTables) {
      setTeamTables(teamTables)
    } else {
      resetTeamTables()
    }
    setTeeTimeCount(teeTimeCount)
    setTextareaValue(textareaValue)
    //A saved lineup will not include an empty team
    let teamCount = Object.keys(teamTables).length - 2
    if (teeTimeCount > teamCount) {
      for (let i = teamCount; i < teeTimeCount; i++) {
        let newTeam = "team" + i
        setTeamTables((teamTables) => ({
          ...teamTables,
          [newTeam]: [],
        }))
      }
    }

    checkForPlayersInLineupButNotInTable()
    if (missingPlayer) return
    const notUsed = ""
    const [ratings, slopes, pars] = get("courseData")
    const playersInGroup = createPlayersArray(
      "createLineupTable",
      notUsed,
      notUsed,
      course,
      game,
      games,
      teesSelected,
      ratings,
      slopes,
      pars,
      notUsed,
      notUsed,
      sortOrder
    )
    const teesSelectedArray = buildTeeArray(teesSelected)
    let newTeamTables = _.cloneDeep(teamTables)
    updateTeamTables()
    let newPlayersInLineupArray = []
    playersInLineup.forEach((id) => {
      newPlayersInLineupArray.push(
        playersInGroup.find((player) => player.id === Number(id))
      )
    })
    setPlayersInLineup(newPlayersInLineupArray)

    function checkForPlayersInLineupButNotInTable() {
      let allPlayersInTable = get("allPlayersInTable")
      playersInLineup.forEach(testPlayer)

      function testPlayer(anId, index) {
        let aPlayerObj = players.find((obj) => obj.id === Number(anId))
        let lastName = aPlayerObj.lastName
        var i = 0
        var playerFound = false
        try {
          do {
            playerFound = allPlayersInTable[i][0] === anId.toString()
            i++
          } while (!playerFound)
          return i - 1
        } catch (error) {
          missingPlayer = true
          setMissingPlayerMessage(
            "One of the players in this lineup (GHIN Number: " +
              anId +
              ", Last Name: " +
              lastName +
              ") is no longer in your table.  Please delete this lineup or edit your table to add the player."
          )
          setShowMissingPlayerModal(true)
        }
      }
    }

    function updateTeamTables() {
      for (let i = 0; i < teeTimeCount; i++) {
        let aTeamName = "team" + i
        try {
          let aPlayerCount = newTeamTables[aTeamName].length
          for (let j = 0; j < aPlayerCount; j++) {
            let aTeamMemberId = newTeamTables[aTeamName][j].id
            let aPlayerObj = playersInGroup.find(
              (obj) => obj.id === aTeamMemberId
            )
            newTeamTables[aTeamName][j].playerName = aPlayerObj.playerName
            newTeamTables[aTeamName][j].strHcpIndex = aPlayerObj.strHcpIndex
            updatePlayerOnTeam(aTeamName, j)
          }
        } catch (error) {
          console.log("error updating Team Tables for: " + aTeamName)
        }
      }

      setTeamTables(newTeamTables)

      function updatePlayerOnTeam(teamName, playerIndex) {
        const aTeeChoice = newTeamTables[teamName][playerIndex].teeChoice
        let teeNo = teesSelectedArray.indexOf(aTeeChoice)
        if (teeNo < 0) teeNo = 0
        const strHcpIndex = newTeamTables[teamName][playerIndex].strHcpIndex
        const gender = getGender(
          newTeamTables[teamName][playerIndex].id.toString()
        )
        const aManualCH = newTeamTables[teamName][playerIndex].manualCH
        const playerName = newTeamTables[teamName][playerIndex].playerName
        if (playerName.endsWith("*")) {
          const newPlayerName = playerName.slice(0, -1)
          newTeamTables[teamName][playerIndex].playerName = newPlayerName
        }
        switch (aManualCH) {
          case "Auto":
            newTeamTables[teamName][playerIndex].courseHandicaps =
              computeCourseHandicaps(gender, strHcpIndex, course, teesSelected)
            break
          case "-":
            for (let j = 0; j < teesSelectedArray.length; j++) {
              newTeamTables[teamName][playerIndex].courseHandicaps[j] = "X"
            }
            break
          default:
            for (let j = 0; j < teesSelectedArray.length; j++) {
              newTeamTables[teamName][playerIndex].courseHandicaps[j] = "*"
            }
            newTeamTables[teamName][playerIndex].courseHandicaps[teeNo] =
              aManualCH
            if (
              !newTeamTables[teamName][playerIndex].playerName.endsWith("*")
            ) {
              newTeamTables[teamName][playerIndex].playerName =
                newTeamTables[teamName][playerIndex].playerName + "*"
            }
            break
        }
      }
    }
  }

  return loadSavedLineup
}
