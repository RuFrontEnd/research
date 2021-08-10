import styled from "styled-components/macro";
import "components/resizableTable/resizableTable.css";

function ResizableTable() {
  return (
    <div class="container" id="container">
      <table
        border="0"
        cellpadding="0"
        cellspacing="0"
        id="table_resize"
        contenteditable="true"
      >
        <tr>
          <th>
            <div>Id</div>
          </th>
          <th>
            <div>First Name</div>
          </th>
          <th>
            <div>Last Name</div>
          </th>
          <th>
            <div>Age</div>
          </th>
        </tr>
        <tr>
          <td>
            <div>1</div>
          </td>
          <td>
            <div>Gowri</div>
          </td>
          <td>
            <div>Prasanth</div>
          </td>
          <td>
            <div>24</div>
          </td>
        </tr>
        <tr>
          <td>
            <div>2</div>
          </td>
          <td>
            <div>Saravana</div>
          </td>
          <td>
            <div>vel</div>
          </td>
          <td>
            <div>24</div>
          </td>
        </tr>
        <tr>
          <td>
            <div>3</div>
          </td>
          <td>
            <div>Kumar</div>
          </td>
          <td>
            <div>KG</div>
          </td>
          <td>
            <div>24</div>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default ResizableTable;
