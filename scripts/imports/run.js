/**
 * 资产导入数据
 */
function Asset(columns, data) {
  // console.log(columns, data);

  let ignore = 0;
  let failure = 0;

  // 整理数据 (也可以调用批量入库处理器)
  data.forEach((item) => {
    if (!item[4]) {
      ignore++;
      return;
    }

    contract_id = saveContractAndGetID(item[3]);
    let payload = {
      sn: item[0],
      name: item[1],
      contract_id: contract_id,
      software_items: { data: item[2], delete: [] },
    };

    let res = Process("xiang.table.Save", "asset", payload);
    if (res.code && res.message) {
      log.Error("[import] Asset %s %s", item[0], res.message);
      failure++;
    }
  });

  return [failure, ignore];
}

function saveContractAndGetID(name) {
  let c = new Store("cache");
  let id = c.Get(name);
  if (id) {
    return id;
  }

  var res = Process("models.contract.Get", {
    select: ["id"],
    wheres: [{ column: "name", value: name }],
  });

  if (res.code && res.message) {
    log.Error("[import] saveContractAndGetID %s %s", name, res.message);
    return false;
  }

  // 添加一个新合同
  if (res.length == 0) {
    id = Process("models.contract.Save", { name: name });
    if (res.code && res.message) {
      log.Error("[import] saveContractAndGetID %s %s", name, res.message);
      return false;
    }

    c.Set(name, id);
    return id;
  }

  // 缓存查询结果
  c.Set(name, res[0].id);
  return res[0].id;
}
