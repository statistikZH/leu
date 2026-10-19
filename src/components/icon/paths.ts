export type IconPathName =
  | "addNew"
  | "alert"
  | "angleDropDown"
  | "angleDropUp"
  | "angleLeft"
  | "angleRight"
  | "arrowDown"
  | "arrowLeft"
  | "arrowRight"
  | "arrowUp"
  | "backward"
  | "block"
  | "calendar"
  | "camera"
  | "caution"
  | "cc"
  | "chart"
  | "chatMessage"
  | "check"
  | "clear"
  | "close"
  | "comment"
  | "conference"
  | "confirm"
  | "confirmPlain"
  | "conversation"
  | "copy"
  | "delete"
  | "download"
  | "earth"
  | "edit"
  | "email"
  | "file"
  | "fileCsv"
  | "fileOutline"
  | "filePdf"
  | "fileXml"
  | "files"
  | "filter"
  | "floppy"
  | "folder"
  | "forward"
  | "getInformation"
  | "hide"
  | "home"
  | "image"
  | "income"
  | "launch"
  | "levelUp"
  | "like"
  | "link"
  | "list"
  | "location"
  | "lock"
  | "login"
  | "logout"
  | "love"
  | "emailOpen"
  | "map"
  | "mapLocateMe"
  | "mapNavigation"
  | "mapPin"
  | "menu"
  | "menuOverflow"
  | "minus"
  | "money"
  | "moneyIncome"
  | "organisation"
  | "overflow"
  | "paperplane"
  | "paragraph"
  | "passport"
  | "phoneCall"
  | "piechart"
  | "pill"
  | "pin"
  | "plus"
  | "print"
  | "refresh"
  | "remove"
  | "repost"
  | "resizeText"
  | "ruler"
  | "search"
  | "securities"
  | "setting"
  | "share"
  | "show"
  | "smileyDevastated"
  | "smileyIndifferent"
  | "smileySad"
  | "smileySmile"
  | "smileyThrilled"
  | "swissId"
  | "time"
  | "upload"
  | "user"
  | "userMultiple"
  | "vote"
  | "zoom"
  | "zoomOut"
  | "fastForward"
  | "fastRewind"
  | "fullScreen"
  | "next"
  | "pause"
  | "play"
  | "playButton"
  | "previous"
  | "skipNext"
  | "skipPrevious"
  | "stop"
  | "facebook"
  | "google"
  | "instagram"
  | "kununu"
  | "linkedin"
  | "snapchat"
  | "tiktok"
  | "twitter"
  | "xing"
  | "youtube"
  | "youtubeLogo"

export const resolver = async (
  iconName: IconPathName | "",
): Promise<string> => {
  switch (iconName) {
    case "addNew":
      return (await import("./library/addNew.js")).default
    case "alert":
      return (await import("./library/alert.js")).default
    case "angleDropDown":
      return (await import("./library/angleDropDown.js")).default
    case "angleDropUp":
      return (await import("./library/angleDropUp.js")).default
    case "angleLeft":
      return (await import("./library/angleLeft.js")).default
    case "angleRight":
      return (await import("./library/angleRight.js")).default
    case "arrowDown":
      return (await import("./library/arrowDown.js")).default
    case "arrowLeft":
      return (await import("./library/arrowLeft.js")).default
    case "arrowRight":
      return (await import("./library/arrowRight.js")).default
    case "arrowUp":
      return (await import("./library/arrowUp.js")).default
    case "backward":
      return (await import("./library/backward.js")).default
    case "block":
      return (await import("./library/block.js")).default
    case "calendar":
      return (await import("./library/calendar.js")).default
    case "camera":
      return (await import("./library/camera.js")).default
    case "caution":
      return (await import("./library/caution.js")).default
    case "cc":
      return (await import("./library/cc.js")).default
    case "chart":
      return (await import("./library/chart.js")).default
    case "chatMessage":
      return (await import("./library/chatMessage.js")).default
    case "check":
      return (await import("./library/check.js")).default
    case "clear":
      return (await import("./library/clear.js")).default
    case "close":
      return (await import("./library/close.js")).default
    case "comment":
      return (await import("./library/comment.js")).default
    case "conference":
      return (await import("./library/conference.js")).default
    case "confirm":
      return (await import("./library/confirm.js")).default
    case "confirmPlain":
      return (await import("./library/confirmPlain.js")).default
    case "conversation":
      return (await import("./library/conversation.js")).default
    case "copy":
      return (await import("./library/copy.js")).default
    case "delete":
      return (await import("./library/delete.js")).default
    case "download":
      return (await import("./library/download.js")).default
    case "earth":
      return (await import("./library/earth.js")).default
    case "edit":
      return (await import("./library/edit.js")).default
    case "email":
      return (await import("./library/email.js")).default
    case "file":
      return (await import("./library/file.js")).default
    case "fileCsv":
      return (await import("./library/fileCsv.js")).default
    case "fileOutline":
      return (await import("./library/fileOutline.js")).default
    case "filePdf":
      return (await import("./library/filePdf.js")).default
    case "fileXml":
      return (await import("./library/fileXml.js")).default
    case "files":
      return (await import("./library/files.js")).default
    case "filter":
      return (await import("./library/filter.js")).default
    case "floppy":
      return (await import("./library/floppy.js")).default
    case "folder":
      return (await import("./library/folder.js")).default
    case "forward":
      return (await import("./library/forward.js")).default
    case "getInformation":
      return (await import("./library/getInformation.js")).default
    case "hide":
      return (await import("./library/hide.js")).default
    case "home":
      return (await import("./library/home.js")).default
    case "image":
      return (await import("./library/image.js")).default
    case "income":
      return (await import("./library/income.js")).default
    case "launch":
      return (await import("./library/launch.js")).default
    case "levelUp":
      return (await import("./library/levelUp.js")).default
    case "like":
      return (await import("./library/like.js")).default
    case "link":
      return (await import("./library/link.js")).default
    case "list":
      return (await import("./library/list.js")).default
    case "location":
      return (await import("./library/location.js")).default
    case "lock":
      return (await import("./library/lock.js")).default
    case "login":
      return (await import("./library/login.js")).default
    case "logout":
      return (await import("./library/logout.js")).default
    case "love":
      return (await import("./library/love.js")).default
    case "emailOpen":
      return (await import("./library/emailOpen.js")).default
    case "map":
      return (await import("./library/map.js")).default
    case "mapLocateMe":
      return (await import("./library/mapLocateMe.js")).default
    case "mapNavigation":
      return (await import("./library/mapNavigation.js")).default
    case "mapPin":
      return (await import("./library/mapPin.js")).default
    case "menu":
      return (await import("./library/menu.js")).default
    case "menuOverflow":
      return (await import("./library/menuOverflow.js")).default
    case "minus":
      return (await import("./library/minus.js")).default
    case "money":
      return (await import("./library/money.js")).default
    case "moneyIncome":
      return (await import("./library/moneyIncome.js")).default
    case "organisation":
      return (await import("./library/organisation.js")).default
    case "overflow":
      return (await import("./library/overflow.js")).default
    case "paperplane":
      return (await import("./library/paperplane.js")).default
    case "paragraph":
      return (await import("./library/paragraph.js")).default
    case "passport":
      return (await import("./library/passport.js")).default
    case "phoneCall":
      return (await import("./library/phoneCall.js")).default
    case "piechart":
      return (await import("./library/piechart.js")).default
    case "pill":
      return (await import("./library/pill.js")).default
    case "pin":
      return (await import("./library/pin.js")).default
    case "plus":
      return (await import("./library/plus.js")).default
    case "print":
      return (await import("./library/print.js")).default
    case "refresh":
      return (await import("./library/refresh.js")).default
    case "remove":
      return (await import("./library/remove.js")).default
    case "repost":
      return (await import("./library/repost.js")).default
    case "resizeText":
      return (await import("./library/resizeText.js")).default
    case "ruler":
      return (await import("./library/ruler.js")).default
    case "search":
      return (await import("./library/search.js")).default
    case "securities":
      return (await import("./library/securities.js")).default
    case "setting":
      return (await import("./library/setting.js")).default
    case "share":
      return (await import("./library/share.js")).default
    case "show":
      return (await import("./library/show.js")).default
    case "smileyDevastated":
      return (await import("./library/smileyDevastated.js")).default
    case "smileyIndifferent":
      return (await import("./library/smileyIndifferent.js")).default
    case "smileySad":
      return (await import("./library/smileySad.js")).default
    case "smileySmile":
      return (await import("./library/smileySmile.js")).default
    case "smileyThrilled":
      return (await import("./library/smileyThrilled.js")).default
    case "swissId":
      return (await import("./library/swissId.js")).default
    case "time":
      return (await import("./library/time.js")).default
    case "upload":
      return (await import("./library/upload.js")).default
    case "user":
      return (await import("./library/user.js")).default
    case "userMultiple":
      return (await import("./library/userMultiple.js")).default
    case "vote":
      return (await import("./library/vote.js")).default
    case "zoom":
      return (await import("./library/zoom.js")).default
    case "zoomOut":
      return (await import("./library/zoomOut.js")).default
    case "fastForward":
      return (await import("./library/fastForward.js")).default
    case "fastRewind":
      return (await import("./library/fastRewind.js")).default
    case "fullScreen":
      return (await import("./library/fullScreen.js")).default
    case "next":
      return (await import("./library/next.js")).default
    case "pause":
      return (await import("./library/pause.js")).default
    case "play":
      return (await import("./library/play.js")).default
    case "playButton":
      return (await import("./library/playButton.js")).default
    case "previous":
      return (await import("./library/previous.js")).default
    case "skipNext":
      return (await import("./library/skipNext.js")).default
    case "skipPrevious":
      return (await import("./library/skipPrevious.js")).default
    case "stop":
      return (await import("./library/stop.js")).default
    case "facebook":
      return (await import("./library/facebook.js")).default
    case "google":
      return (await import("./library/google.js")).default
    case "instagram":
      return (await import("./library/instagram.js")).default
    case "kununu":
      return (await import("./library/kununu.js")).default
    case "linkedin":
      return (await import("./library/linkedin.js")).default
    case "snapchat":
      return (await import("./library/snapchat.js")).default
    case "tiktok":
      return (await import("./library/tiktok.js")).default
    case "twitter":
      return (await import("./library/twitter.js")).default
    case "xing":
      return (await import("./library/xing.js")).default
    case "youtube":
      return (await import("./library/youtube.js")).default
    case "youtubeLogo":
      return (await import("./library/youtubeLogo.js")).default
    default:
      return ""
  }
}
