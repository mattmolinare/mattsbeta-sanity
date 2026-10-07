import ArrowDownIcon from "@sanity/icons/ArrowDown";
import ArrowUpIcon from "@sanity/icons/ArrowUp";
import CopyIcon from "@sanity/icons/Copy";
import TrashIcon from "@sanity/icons/Trash";
import { Button, Flex, Stack, useToast } from "@sanity/ui";
import { useContext } from "react";
import type { BlockProps } from "sanity";
import { ReportMoveContext } from "./report-context";

const FigureBlock = (props: BlockProps) => {
  const { value, onRemove } = props;

  const toast = useToast();

  const moveBlock = useContext(ReportMoveContext);

  const photoS3Key = (value as { photoS3Key?: string }).photoS3Key;

  return (
    <Stack gap={1}>
      <Flex gap={2} justify="flex-end">
        {moveBlock !== undefined && (
          <>
            <Button
              icon={ArrowUpIcon}
              title="Move up"
              mode="ghost"
              fontSize={1}
              onClick={() => moveBlock(value._key, "up")}
            />
            <Button
              icon={ArrowDownIcon}
              title="Move down"
              mode="ghost"
              fontSize={1}
              onClick={() => moveBlock(value._key, "down")}
            />
          </>
        )}
        {photoS3Key !== undefined && (
          <Button
            icon={CopyIcon}
            title="Copy photo S3 key"
            mode="ghost"
            fontSize={1}
            onClick={() => {
              navigator.clipboard.writeText(photoS3Key);

              toast.push({
                status: "success",
                title: "Photo S3 key copied",
                closable: true,
                duration: 1000,
              });
            }}
          />
        )}
        <Button
          icon={TrashIcon}
          title="Remove figure"
          tone="critical"
          mode="ghost"
          fontSize={1}
          onClick={onRemove}
        />
      </Flex>
      {props.renderDefault(props)}
    </Stack>
  );
};

export default FigureBlock;
