import { Injectable } from '@angular/core';
import { ScriptStore } from "./script.store";

declare let document: any;
declare let XMLHttpRequest: any;

@Injectable()
export class ScriptLoaderService {

  private scripts: any = {};

  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }

  load(...scripts: string[]) {
    scripts.forEach((script) => this.loadScript(script));
  }

  loadScript(name: string) {
    let self = this;

    if (!this.scripts[name].loaded) {
      var req = new XMLHttpRequest();
      req.open('GET', self.scripts[name].src, false);
      req.onreadystatechange = function() {
        if (req.readyState == 4) {
          var s = document.createElement("script");
          s.appendChild(document.createTextNode(req.responseText));
          self.scripts[name].loaded = true;
          document.head.appendChild(s);
        }
      };
      req.send(null);
    }
  }
}
