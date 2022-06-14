import {
  Dropdown,
  DropdownContent,
  TextDropdownContent,
  TitleDropdonw,
} from "../style/content/default";

export const DropDown_More = ({
  data_more = [],
  title = "title",
  onClick,
  id,
  data_table,
}) => {
  return (
    <Dropdown>
      <TitleDropdonw>{title}</TitleDropdonw>

      {/* content */}

      <DropdownContent>
        {data_more.map((item, idx) => (
          <TextDropdownContent
            key={idx}
            onClick={() => onClick({ name: item.name, id })}
          >
            {item.name}
          </TextDropdownContent>
        ))}
      </DropdownContent>
    </Dropdown>
  );
};
