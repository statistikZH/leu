import { html } from "lit"
import "../leu-sticky.js"

export default {
  title: "Sticky",
  component: "leu-sticky",
}

function Template({ top }) {
  const padding = 5
  return html`
    <p>
      Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet
      doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit
      amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
      tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad
      minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis
      nisl ut aliquip ex ea commodo consequat.
    </p>

    <leu-sticky>
      <div
        style="background:#666; color:#fff; padding:${padding}px; height:${top -
        2 * padding}px;"
      >
        Test Sticky
      </div>
    </leu-sticky>

    <h2>Lorem</h2>
    <p>
      Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet
      doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit
      amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
      tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad
      minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis
      nisl ut aliquip ex ea commodo consequat.
    </p>

    <leu-sticky .top=${top}>
      <div style="background:#ccc; padding:${padding}px;">
        Test Sticky with top="40"
      </div>
    </leu-sticky>

    <p>
      Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
      molestie consequat, vel illum dolore eu feugiat nulla facilisis.
    </p>
    <p>
      At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
      gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
      ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
      tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
      clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
      amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam
      aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed
      tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna
      no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor
      sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
      diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
      erat.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
      clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
      amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
      nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
      diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
      sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
      diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
      erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
      rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
      dolor sit amet.
    </p>
    <p>
      Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
      molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero
      eros et accumsan et iusto odio dignissim qui blandit praesent luptatum
      zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum
      dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
      euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
    </p>
    <p>
      Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper
      suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel
      eum iriure dolor in hendrerit in vulputate velit esse molestie consequat,
      vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et
      iusto odio dignissim qui blandit praesent luptatum zzril delenit augue
      duis dolore te feugait nulla facilisi.
    </p>
    <h2>Ipsum</h2>
    <p>
      Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
      labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
      accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
      sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
      amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
      ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
      accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
      sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
      amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
      ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
      accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
      sea takimata sanctus.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
      clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
      amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
      nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
      diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
      sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
      diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
      erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
      rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
      dolor sit amet.
    </p>
    <p>
      Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
      molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero
      eros et accumsan et iusto odio dignissim qui blandit praesent luptatum
      zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum
      dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
      euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
    </p>
    <p>
      Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper
      suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel
      eum iriure dolor in hendrerit in vulputate velit esse molestie consequat,
      vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et
      iusto odio dignissim qui blandit praesent luptatum zzril delenit augue
      duis dolore te feugait nulla facilisi.
    </p>
    <p>
      Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet
      doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit
      amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
      tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad
      minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis
      nisl ut aliquip ex ea commodo consequat.
    </p>
  `
}

export const Regular = Template.bind({})
Regular.args = {
  top: 40,
}
