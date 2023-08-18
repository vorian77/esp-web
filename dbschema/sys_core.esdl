module sys_core {
  type SysEnt extending default::Mgmt {
    required name: default::Name {
      constraint exclusive;
    };
  }

  abstract type SysObj extending default::Mgmt {
    required owner: sys_core::SysEnt;
    required name: default::Name;
    name_display: str;
    constraint exclusive on ((.owner, .name));
  }

  type SysCodeType extending sys_core::SysObj {}

  type SysCode extending sys_core::SysObj {
    required code_type: sys_core::SysCodeType;
  }

# functions
function getEnt(entName: str) -> optional SysEnt
    using (select SysEnt filter .name = entName);

function getSysObj(objOwnerName: str, objName: str) -> optional SysObj
    using (select SysObj filter .owner = (select getEnt(objOwnerName)) and .name = objName);

function getCodeType(codeTypeOwnerName: str, codeTypeName: str) -> optional SysCodeType
    using (select SysCodeType filter .owner = (select getEnt(codeTypeOwnerName)) and .name = codeTypeName);

function getCode(codeTypeOwnerName: str, codeTypeName: str, codeOwnerName: str, codeName: str) -> optional SysCode
    using (select SysCode filter .code_type = (select getCodeType(codeTypeOwnerName, codeTypeName)) and .owner = (select getEnt(codeOwnerName)) and .name = codeName);

}