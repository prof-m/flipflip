import * as React from 'react';

import {GO, IF, OF, VO, WF} from "../../data/const";
import {SceneSettings} from "../../data/Config";
import Scene from "../../data/Scene";
import ControlGroup from "./ControlGroup";
import SimpleCheckbox from "../ui/SimpleCheckbox";
import SimpleOptionPicker from "../ui/SimpleOptionPicker";
import SimpleRadioInput from "../ui/SimpleRadioInput";
import SimpleNumberInput from "../ui/SimpleNumberInput";

export default class ImageGroup extends React.Component {
  readonly props: {
    scene: Scene | SceneSettings,
    isPlayer: boolean,
    onUpdateScene(scene: Scene | SceneSettings, fn: (scene: Scene | SceneSettings) => void): void,
  };

  render() {
    return (
      <ControlGroup title="Images" isNarrow={true}>
        {!this.props.isPlayer && (
          <div className="ControlSubgroup ImageOptionGroup m-inline">
            <SimpleOptionPicker
              onChange={this.changeKey.bind(this, 'imageTypeFilter').bind(this)}
              label="Image Filter"
              value={this.props.scene.imageTypeFilter}
              keys={Object.values(IF)}/>
            {this.props.scene.imageTypeFilter != IF.stills && (
              <React.Fragment>
                <SimpleOptionPicker
                  onChange={this.changeKey.bind(this, 'gifOption').bind(this)}
                  label="GIF Options"
                  value={this.props.scene.gifOption}
                  keys={Object.values(GO)}/>
                {this.props.scene.gifOption == GO.part && (
                  <div>
                    For
                    <SimpleNumberInput
                      label=""
                      value={this.props.scene.gifTimingConstant}
                      isEnabled={true}
                      min={0}
                      onChange={this.changeKey.bind(this, 'gifTimingConstant').bind(this)}/>
                    ms
                  </div>
                )}
                <SimpleOptionPicker
                  onChange={this.changeKey.bind(this, 'videoOption').bind(this)}
                  label="Video Options"
                  value={this.props.scene.videoOption}
                  keys={Object.values(VO)}/>
                {this.props.scene.videoOption == VO.part && (
                  <div>
                    For
                    <SimpleNumberInput
                      label=""
                      value={this.props.scene.videoTimingConstant}
                      isEnabled={true}
                      min={0}
                      onChange={this.changeKey.bind(this, 'videoTimingConstant').bind(this)}/>
                    ms
                  </div>
                )}
              </React.Fragment>
            )}
            <hr/>
          </div>
        )}
        <div className="ControlSubgroup m-inline">
          {!this.props.isPlayer && (
            <SimpleRadioInput
              label={"Weight"}
              groupName={"wf"}
              value={this.props.scene.weightFunction}
              keys={Object.values(WF)}
              onChange={this.changeWeightFunction.bind(this)} />
          )}
          <SimpleRadioInput
            label={"Order"}
            groupName={"of"}
            value={this.props.scene.orderFunction}
            keys={this.props.scene.sources.length <= 1 || this.props.scene.weightFunction == WF.images ? Object.values(OF) : [OF.ordered, OF.random]}
            onChange={this.changeKey.bind(this, 'orderFunction').bind(this)} />
          {this.props.scene.orderFunction == OF.random && (
            <SimpleCheckbox
              text={"Show All Images Before Looping"}
              isOn={this.props.scene.forceAll}
              onChange={this.changeKey.bind(this, 'forceAll').bind(this)} />
          )}
        </div>
      </ControlGroup>
    );
  }

  update(fn: (scene: any) => void) {
    this.props.onUpdateScene(this.props.scene, fn);
  }

  changeKey(key: string, value: any) {
    this.update((s) => s[key] = value);
  }

  changeWeightFunction(wf: string) {
    if (this.props.scene.orderFunction == OF.strict && (this.props.scene.sources.length > 1 && wf == WF.sources)) {
      this.update((s) => {
        s.weightFunction = wf;
        s.orderFunction = OF.ordered;
        return s;
      })
    } else {
      this.update((s) => s.weightFunction = wf);
    }

  }
}