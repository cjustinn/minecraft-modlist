import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function ArrayIncludesValue(_arr: any[], _property: string, _value: any) {
  return (_arr.filter(e => e[_property] === _value).length > 0);
}

function GetElementIndexFromValue(_arr: any[], _property: string, _value: any) {
  return _arr.findIndex(e => e[_property] === _value);
}

function App() {
  const [ mods, setMods ] = useState<any[]>([]);

  useEffect(() => {
    fetch("mods.json").then(_mods => {
      return _mods.json();
    }).then(data => {
      let organizedMods: any[] = [];
  
      for (let i = 0; i < data.mods.length; i++) {
        if (ArrayIncludesValue(organizedMods, `type`, data.mods[i].type)) {
          const idx = GetElementIndexFromValue(organizedMods, `type`, data.mods[i].type);
          organizedMods[idx].mods.push(data.mods[i]);
        } else {

          organizedMods.push({
            type: data.mods[i].type,
            mods: [ data.mods[i] ]
          });

        }
      }
  
      setMods(organizedMods);
    });
  }, [])

  return (
    <div className="page-background">
      <h1 className="text-white font-bold text-5xl">Super Cool Minecraft Mod List</h1>
      <h3 className="text-gray-300 font-thin text-xl">Click any card to open the mod's CurseForge page</h3>

      <p className="text-gray-100 font-thin text-md my-6 md:w-1/2 xs:w-full text-center">
        I'm sure you'll be able to figure it out, but any mod that is marked as required is going to be server-side and client-side, so to join the server you'll <i>have</i> to have it installed.
        Anything that is <b>NOT</b> marked required is optional, and you can add them (or add any others) as you see fit since they're purely client-side.
      </p>

      <div className="text-center w-full my-6">
        <p className="text-white text-sm mb-3">Forge Version: <span>1.18.2-40.1.68</span></p>
        <a target="_blank" href="https://drive.google.com/file/d/10dpq0dh-VCNcPayAXzyABZnu4BJeOPCx/view?usp=sharing" className="button text-white text-2xl font-thin">Download All Mods</a>
      </div>
      
      <div className="text-start w-full">
        {
          mods.sort((a: any, b: any) => a.type.localeCompare(b.type)).map((category: any) => {
            return (
              <div key={category.type}>
                <p className="text-white text-2xl font-bold mb-2">{category.type}</p>

                <div className="grid gap-5 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 grid-rows-auto w-full mb-12">
                  {
                    category.mods.sort((a: any, b:any) => a.name.localeCompare(b.name)).sort((a: any, b:any) => b.required - a.required).map((mod: any) => {
                      return (
                        <a key={mod.id} className="card shadow-red-300" href={mod.link} target="_blank">
                          <div className="card-body">
                            <div className="w-full">
                              <p className="float-left text-white font-bold text-lg">{mod.name}</p>
                              {
                                mod.required ?
                                <p className="float-right text-red-300 text-xs">REQUIRED</p>
                                :
                                null
                              }
                            </div>
                            
                            <p className="float-left text-gray-300 text-md">{mod.type}</p>
                          </div>
                        </a>
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
